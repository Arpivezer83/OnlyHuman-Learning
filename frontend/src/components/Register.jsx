import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Sikeres regisztráció!');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage(data.error || 'Hiba történt');
      }
    } catch (err) {
      setMessage('Kapcsolati hiba');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Regisztráció</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-2 w-72">
        <input type="text" placeholder="Felhasználónév" className="border p-2" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Jelszó" className="border p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        {message && <p className="text-green-500">{message}</p>}
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Regisztrálok</button>
      </form>
    </div>
  );
}
