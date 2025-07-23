import React, { useState } from 'react';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    if (!username) return;

    // Backendhez küldjük a profil létrehozást
    await fetch(`http://127.0.0.1:5000/user/${username}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });

    setUser(username);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6">OnlyHuman Login</h1>
      <input
        className="border p-2 rounded mb-4"
        placeholder="Írd be a neved..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
        Belépés
      </button>
    </div>
  );
}
