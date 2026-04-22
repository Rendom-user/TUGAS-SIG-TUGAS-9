from fastapi import APIRouter, HTTPException, status
from ..database import get_pool
from ..models.user import UserCreate
from ..auth_utils import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
async def register(user: UserCreate):
    pool = get_pool()  # Tanpa await
    async with pool.acquire() as conn:
        existing_user = await conn.fetchval("SELECT username FROM users WHERE username = $1", user.username)
        if existing_user:
            raise HTTPException(status_code=400, detail="Username sudah terdaftar")
        
        hashed = hash_password(user.password)
        await conn.execute("INSERT INTO users (username, hashed_password) VALUES ($1, $2)", user.username, hashed)
        return {"message": "User berhasil terdaftar!"}

@router.post("/login")
async def login(user: UserCreate):
    pool = get_pool()  # Tanpa await
    async with pool.acquire() as conn:
        db_user = await conn.fetchrow("SELECT id, username, hashed_password FROM users WHERE username = $1", user.username)
        if not db_user or not verify_password(user.password, db_user['hashed_password']):
            raise HTTPException(status_code=401, detail="Username atau password salah")
        
        token = create_access_token({"sub": user.username})
        return {"access_token": token, "token_type": "bearer"}