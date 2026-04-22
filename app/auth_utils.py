# app/auth_utils.py
import bcrypt
from jose import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

SECRET_KEY = "kiel_secret_key" 
ALGORITHM = "HS256"
security = HTTPBearer()

# 1. Hashing Password menggunakan bcrypt langsung
def hash_password(password: str):
    # Batasi sampai 72 bytes sebelum di-encode
    pwd_bytes = password.encode('utf-8')[:72]
    # Buat salt dan hash
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

# 2. Verifikasi Password
def verify_password(plain_password, hashed_password):
    pwd_bytes = plain_password.encode('utf-8')[:72]
    return bcrypt.checkpw(pwd_bytes, hashed_password.encode('utf-8'))

# 3. JWT Token
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Token tidak valid")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)):
    return decode_token(credentials.credentials)