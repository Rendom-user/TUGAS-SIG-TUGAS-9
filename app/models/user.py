# app/models/user.py
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str