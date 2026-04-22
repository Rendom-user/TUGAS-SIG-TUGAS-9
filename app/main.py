from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .database import init_db, close_db
from .routers import fasilitas, auth

# 1. Definisikan Lifespan untuk mengelola koneksi database secara efisien
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Siapkan pool koneksi saat aplikasi nyala
    await init_db()
    yield
    # Shutdown: Tutup pool koneksi saat aplikasi mati
    await close_db()

# 2. Masukkan lifespan ke dalam FastAPI
app = FastAPI(title="WebGIS Backend API", lifespan=lifespan)

# 3. Konfigurasi CORS
origins = [
    "http://localhost:5173", 
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Mendaftarkan Router (seperti kodinganmu)
app.include_router(fasilitas.router)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Selamat datang di Backend WebGIS!"}