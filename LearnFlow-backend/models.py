from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["login_db"]
users_collection = db["users"]
print("Connected to MongoDB Atlas successfully.")