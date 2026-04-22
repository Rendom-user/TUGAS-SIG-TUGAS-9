from fastapi import APIRouter, HTTPException # Tambahkan HTTPException untuk error handling
from ..database import get_pool
# PERBAIKAN: Import FasilitasCreate agar bisa digunakan
from ..models.fasilitas import Fasilitas, FasilitasCreate 

router = APIRouter(prefix="/api/fasilitas", tags=["fasilitas"])

@router.get("/")
async def get_fasilitas():
    pool = await get_pool()
    async with pool.acquire() as conn:
        rows = await conn.fetch("SELECT id, nama, jenis, alamat, ST_X(geom) as lon, ST_Y(geom) as lat FROM fasilitas_publik")
        return [dict(r) for r in rows]

@router.post("/")
async def create_fasilitas(data: FasilitasCreate):
    pool = await get_pool()
    async with pool.acquire() as conn:
        # Menambahkan data dengan PostGIS
        await conn.execute(
            "INSERT INTO fasilitas_publik (nama, jenis, alamat, geom) VALUES ($1, $2, $3, ST_SetSRID(ST_Point($4, $5), 4326))",
            data.nama, data.jenis, data.alamat, data.longitude, data.latitude
        )
        return {"message": "Data berhasil ditambah"}

@router.delete("/{id}")
async def delete_fasilitas(id: int):
    pool = await get_pool()
    async with pool.acquire() as conn:
        # Cek dulu apakah data ada atau tidak
        result = await conn.execute("DELETE FROM fasilitas_publik WHERE id = $1", id)
        if result == "DELETE 0":
            raise HTTPException(status_code=404, detail="Data tidak ditemukan")
        return {"message": "Data berhasil dihapus"}