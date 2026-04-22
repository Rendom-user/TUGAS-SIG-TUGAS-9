from pydantic import BaseModel
from typing import Optional

class FasilitasBase(BaseModel):
    nama: str
    jenis: str
    alamat: str
    longitude: float
    latitude: float

class FasilitasCreate(FasilitasBase):
    pass

class FasilitasUpdate(BaseModel):
    nama: Optional[str] = None
    jenis: Optional[str] = None
    alamat: Optional[str] = None

class Fasilitas(FasilitasBase):
    id: int
    class Config:
        from_attributes = True