import asyncpg

# URL database yang sudah benar
DATABASE_URL = "postgresql://postgres:kiel@localhost:5432/sig_123140118"

db_pool = None

async def init_db():
    global db_pool
    # Pool dibuat sekali saat aplikasi startup
    try:
        db_pool = await asyncpg.create_pool(DATABASE_URL)
        print("Database pool berhasil dibuat!")
    except Exception as e:
        print(f"Gagal koneksi ke database: {e}")
        raise e

async def close_db():
    global db_pool
    if db_pool:
        await db_pool.close()
        print("Database pool ditutup.")

def get_pool():
    return db_pool