import { useState } from 'react';
import axios from 'axios';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/auth/login', { username, password });
      localStorage.setItem('token', res.data.access_token); // Simpan token di browser
      setLoggedIn(true);
      alert("Login Berhasil!");
    } catch (err) {
      alert("Login Gagal! Username/Password salah.");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '20px', background: '#eee' }}>
      <h2>Login Admin</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};
export default Login;