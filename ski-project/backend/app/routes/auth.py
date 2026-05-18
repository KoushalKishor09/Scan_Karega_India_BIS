import httpx
from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import RedirectResponse
from app.core.config import settings
from app.core.auth import create_access_token, get_current_user
from app.core.db import users_collection
from datetime import datetime

router = APIRouter()

# Front-end dashboard URL to redirect back to after login
FRONTEND_DASHBOARD_URL = settings.FRONTEND_URL

@router.get("/google/login")
async def google_login():
    """Redirect to Google's OAuth consent screen or suggest mock if not configured."""
    if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_REDIRECT_URI:
        raise HTTPException(
            status_code=500,
            detail="Google OAuth credentials are not fully configured in backend .env file!"
        )
        
    google_auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={settings.GOOGLE_CLIENT_ID}"
        f"&redirect_uri={settings.GOOGLE_REDIRECT_URI}"
        f"&response_type=code"
        f"&scope=openid%20profile%20email"
        f"&prompt=consent"
    )
    return RedirectResponse(url=google_auth_url)


@router.get("/google/callback")
async def google_callback(code: str | None = None, error: str | None = None):
    """Handle Google OAuth redirect, retrieve user info, save to DB, and issue JWT."""
    if error:
        raise HTTPException(status_code=400, detail=f"Google OAuth Error: {error}")
        
    if not code:
        raise HTTPException(status_code=400, detail="Missing authorization code")
        
    # Exchange authorization code for access token
    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uri": settings.GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code",
            }
        )
        
        if token_res.status_code != 200:
            raise HTTPException(status_code=400, detail=f"Failed to retrieve Google token: {token_res.text}")
            
        token_data = token_res.json()
        access_token = token_data.get("access_token")
        
        # Get user profile information using the access token
        user_res = await client.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        
        if user_res.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to retrieve Google user profile")
            
        user_info = user_res.json()
        
    email = user_info.get("email")
    name = user_info.get("name", "Gmail User")
    picture = user_info.get("picture", "")
    
    if not email:
        raise HTTPException(status_code=400, detail="Google account did not provide an email address")
        
    # Upsert user in MongoDB
    user_doc = {
        "email": email,
        "name": name,
        "picture": picture,
        "last_login": datetime.utcnow(),
    }
    
    try:
        await users_collection.update_one(
            {"email": email},
            {"$set": user_doc, "$setOnInsert": {"created_at": datetime.utcnow()}},
            upsert=True
        )
    except Exception as db_err:
        raise HTTPException(
            status_code=503,
            detail=f"MongoDB is not running! Please make sure your MongoDB server is started locally at port 27017. Details: {db_err}"
        )
    
    # Create JWT session token
    token = create_access_token({"email": email, "name": name, "picture": picture})
    
    # Redirect back to frontend dashboard with token
    return RedirectResponse(url=f"{FRONTEND_DASHBOARD_URL}/?token={token}")


@router.get("/mock/login")
async def mock_login(email: str = "anil.monitor@gmail.com", name: str = "Anil Monitor"):
    """One-click mock login for immediate testing without setting up Google Console credentials."""
    picture = f"https://api.dicebear.com/7.x/adventurer/svg?seed={name.replace(' ', '')}"
    
    # Upsert in MongoDB
    user_doc = {
        "email": email,
        "name": name,
        "picture": picture,
        "last_login": datetime.utcnow(),
    }
    
    try:
        await users_collection.update_one(
            {"email": email},
            {"$set": user_doc, "$setOnInsert": {"created_at": datetime.utcnow()}},
            upsert=True
        )
    except Exception as db_err:
        raise HTTPException(
            status_code=503,
            detail=f"MongoDB is not running! Please make sure your MongoDB server is started locally at port 27017. Details: {db_err}"
        )
    
    # Create JWT token
    token = create_access_token({"email": email, "name": name, "picture": picture})
    
    # Redirect to frontend
    return RedirectResponse(url=f"{FRONTEND_DASHBOARD_URL}/?token={token}")


from pydantic import BaseModel

class ProfileUpdate(BaseModel):
    name: str | None = None
    gender: str | None = None
    blood_group: str | None = None
    allergies: str | None = None
    diabetic: str | None = None
    other_conditions: str | None = None


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Fetch the authenticated user's details directly from MongoDB."""
    db_user = await users_collection.find_one({"email": current_user["email"]})
    if not db_user:
        return current_user
    db_user["_id"] = str(db_user["_id"])
    return db_user


@router.post("/me/update")
async def update_profile(profile: ProfileUpdate, current_user: dict = Depends(get_current_user)):
    """Update the authenticated user's profile and health metrics in MongoDB."""
    update_data = {}
    if profile.name is not None:
        update_data["name"] = profile.name
    if profile.gender is not None:
        update_data["gender"] = profile.gender
    if profile.blood_group is not None:
        update_data["blood_group"] = profile.blood_group
    if profile.allergies is not None:
        update_data["allergies"] = profile.allergies
    if profile.diabetic is not None:
        update_data["diabetic"] = profile.diabetic
    if profile.other_conditions is not None:
        update_data["other_conditions"] = profile.other_conditions
        
    if not update_data:
        return {"status": "no changes"}
        
    await users_collection.update_one(
        {"email": current_user["email"]},
        {"$set": update_data}
    )
    
    updated_user = await users_collection.find_one({"email": current_user["email"]})
    if updated_user:
        updated_user["_id"] = str(updated_user["_id"])
        return updated_user
    return {"status": "success"}
