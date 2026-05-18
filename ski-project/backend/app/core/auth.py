from datetime import datetime, timedelta
import jwt
from fastapi import Request, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import settings

# Initialize Bearer Security Scheme
security_scheme = HTTPBearer(auto_error=False)

def create_access_token(data: dict) -> str:
    """Generate a JWT token with an expiry period."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRY_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> dict | None:
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None

async def get_current_user(request: Request, credentials: HTTPAuthorizationCredentials | None = Security(security_scheme)) -> dict:
    """
    FastAPI dependency to extract and verify JWT.
    Supports token in Bearer Header, Cookie, or Query Parameter for flexibility.
    """
    token = None
    
    # 1. Check Authorization Bearer Header
    if credentials:
        token = credentials.credentials
        
    # 2. Check Cookie
    if not token:
        token = request.cookies.get("token")
        
    # 3. Check Query Parameter
    if not token:
        token = request.query_params.get("token")
        
    if not token:
        raise HTTPException(
            status_code=401,
            detail="Authentication required. Please log in first.",
        )
        
    payload = decode_access_token(token)
    if not payload or "email" not in payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired session. Please log in again.",
        )
        
    return {
        "email": payload["email"],
        "name": payload.get("name", "User"),
        "picture": payload.get("picture", ""),
    }
