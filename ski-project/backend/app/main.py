import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.routes import scan, products, health_score, image_scan, auth

app = FastAPI(
    title="SKI — Scan Karega India API",
    version="0.1.0",
    description="AI-powered food quality monitoring platform",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount local uploads folder for static serving
uploads_dir = settings.BASE_DIR / "uploads"
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

app.include_router(auth.router,         prefix="/api/auth",         tags=["Authentication"])
app.include_router(scan.router,         prefix="/api/scan",         tags=["Scan"])
app.include_router(products.router,     prefix="/api/products",     tags=["Products"])
app.include_router(health_score.router, prefix="/api/health-score", tags=["Health Score"])
app.include_router(image_scan.router,   prefix="/api/image-scan",   tags=["Image Scan"])

@app.get("/")
def root():
    return {"message": "SKI API is running", "version": "0.1.0", "docs": "/docs"}
