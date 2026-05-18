import json
import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")


def _parse_origins(raw_value: str) -> list[str]:
    if not raw_value:
        return ["http://localhost:5173", "http://localhost:3000"]

    try:
        parsed = json.loads(raw_value)
        if isinstance(parsed, list):
            return [str(item) for item in parsed]
    except json.JSONDecodeError:
        pass

    return [item.strip() for item in raw_value.split(",") if item.strip()]


class Settings:
    def __init__(self) -> None:
        self.BASE_DIR = BASE_DIR
        self.ALLOWED_ORIGINS = _parse_origins(os.getenv("ALLOWED_ORIGINS", ""))
        self.ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
        self.GEMINI_API_KEY = (
            os.getenv("GEMINI_API_KEY", "")
            or os.getenv("GOOGLE_API_KEY", "")
            or os.getenv("ANTHROPIC_API_KEY", "")
        )
        
        # MongoDB Config
        self.MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        self.DB_NAME = os.getenv("DB_NAME", "Scan_karega_INDIA")
        
        # JWT Token Config
        self.JWT_SECRET = os.getenv("JWT_SECRET", "ski-super-secret-key-change-in-production")
        self.JWT_ALGORITHM = "HS256"
        self.JWT_EXPIRY_MINUTES = 60 * 24 * 7  # 1 week session
        
        # Google OAuth Credentials
        self.GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
        self.GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
        self.GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "")


settings = Settings()
