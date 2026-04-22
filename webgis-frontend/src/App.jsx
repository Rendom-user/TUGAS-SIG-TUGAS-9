import { useState } from 'react';
import MapView from './components/MapView';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [creds, setCreds] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/auth/login', creds);
      localStorage.setItem('token', res.data.access_token);
      setIsLoggedIn(true);
    } catch (err) {
      alert("Login Gagal! Cek username/password.");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Login Admin</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input placeholder="Username" onChange={e => setCreds({...creds, username: e.target.value})} required />
          <input type="password" placeholder="Password" onChange={e => setCreds({...creds, password: e.target.value})} required />
          <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>Login</button>
        </form>
      </div>
    );
  }

  return <MapView onLogout={logout} />;
}

export default App;