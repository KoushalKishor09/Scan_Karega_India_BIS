from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

# Initialize Async MongoDB Client
client = AsyncIOMotorClient(settings.MONGODB_URL)
db = client[settings.DB_NAME]

# Collections
users_collection = db["users"]
scans_collection = db["scans"]
