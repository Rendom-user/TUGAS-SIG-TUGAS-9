# WebGIS Fasilitas Publik

Aplikasi Sistem Informasi Geografis berbasis web untuk memetakan dan mengelola data fasilitas publik. Proyek ini dibangun sebagai bagian dari tugas mata kuliah Sistem Informasi Geografis (SIG).

## 🚀 Tech Stack
- **Backend**: FastAPI (Python), PostgreSQL, PostGIS, Asyncpg
- **Frontend**: React.js, Vite, Leaflet.js
- **Keamanan**: JWT Authentication, Bcrypt Password Hashing

## 📋 Fitur Utama
- **Autentikasi Admin**: Login aman dengan JWT.
- **Peta Interaktif**: Visualisasi fasilitas publik menggunakan Leaflet.
- **Manajemen Data**: CRUD (Create, Read, Delete) fasilitas dengan database spasial (PostGIS).

## 🛠️ Instalasi & Setup

### Backend (FastAPI)
1. Masuk ke folder backend: `cd app`
2. Buat virtual environment: `python -m venv venv`
3. Aktifkan venv & install dependencies:
   - Windows: `venv\Scripts\activate`
   - `pip install -r requirements.txt`
4. Buat file `.env` (isi sesuai konfigurasi database Anda):
DATABASE_URL=postgresql://username:password@localhost:5432/nama_database

5. Jalankan server: `uvicorn main:app --reload`

### Frontend (React)
1. Masuk ke folder frontend: `cd webgis-frontend`
2. Install dependencies: `npm install`
3. Jalankan aplikasi: `npm run dev`

## 👤 Author
**Hezkiel Rajani Aritonang 123140118**
*Informatics Engineering Student - Institut Teknologi Sumatera (ITERA)*