import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix ikon marker agar muncul di React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  const [fasilitas, setFasilitas] = useState([]);
  const [formData, setFormData] = useState({ nama: '', jenis: '', alamat: '', longitude: '', latitude: '' });

  // Fungsi Fetch Data
  const fetchData = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/fasilitas/');
      setFasilitas(res.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi Hapus
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus fasilitas ini?")) {
      await axios.delete(`http://127.0.0.1:8000/api/fasilitas/${id}`);
      fetchData(); // Refresh data setelah hapus
    }
  };

  // Fungsi Tambah
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/fasilitas/', formData);
      fetchData(); // Refresh data setelah tambah
      setFormData({ nama: '', jenis: '', alamat: '', longitude: '', latitude: '' }); // Reset form
    } catch (err) {
      alert("Gagal menambahkan data. Pastikan format koordinat benar.");
    }
  };

  const inputStyle = { padding: '10px', flex: '1 1 150px', borderRadius: '4px', border: '1px solid #ccc' };

  return (
    <div style={{ padding: "20px", width: "95%", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>WebGIS Fasilitas Publik</h1>
      
      {/* Form Input */}
      <form 
        onSubmit={handleCreate} 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '10px', 
          marginBottom: '20px', 
          padding: '20px', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        <input style={inputStyle} placeholder="Nama Fasilitas" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} required />
        <input style={inputStyle} placeholder="Jenis" value={formData.jenis} onChange={e => setFormData({...formData, jenis: e.target.value})} required />
        <input style={inputStyle} placeholder="Alamat" value={formData.alamat} onChange={e => setFormData({...formData, alamat: e.target.value})} required />
        <input style={inputStyle} placeholder="Longitude" type="number" step="any" value={formData.longitude} onChange={e => setFormData({...formData, longitude: parseFloat(e.target.value)})} required />
        <input style={inputStyle} placeholder="Latitude" type="number" step="any" value={formData.latitude} onChange={e => setFormData({...formData, latitude: parseFloat(e.target.value)})} required />
        <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Tambah Data</button>
      </form>

      {/* Peta */}
      <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
        <MapContainer center={[-5.35, 105.3]} zoom={13} style={{ height: "70vh", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {fasilitas.map((item) => (
            <Marker key={item.id} position={[item.lat, item.lon]}>
              <Popup>
                <div style={{ padding: '5px' }}>
                  <strong>{item.nama}</strong><br />
                  Jenis: {item.jenis}<br />
                  Alamat: {item.alamat}<br />
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    style={{ marginTop: '10px', background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Hapus
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;