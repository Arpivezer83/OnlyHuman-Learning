import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Hiba történt');
      }
    } catch (err) {
      setError('Kapcsolati hiba');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Bejelentkezés</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 w-72">
        <input type="text" placeholder="Felhasználónév" className="border p-2" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Jelszó" className="border p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Belépés</button>
      </form>
    </div>
  );
}
