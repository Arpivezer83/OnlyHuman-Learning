import React, { useEffect, useState } from 'react';

export default function Dashboard({ user, setPage }) {
  const [xp, setXp] = useState(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/user/${user}`)
      .then(res => res.json())
      .then(data => {
        setXp(data.xp);
      });
  }, [user]);

  return (
    <div className="p-4 max-w-lg mx-auto text-center">
      <h1 className="text-2xl mb-4">Üdv, {user}!</h1>
      <p className="text-xl mb-4">Összes XP: {xp}</p>

      <button onClick={() => setPage('chat')} className="bg-green-500 text-white p-2 rounded mb-2">
        Menj gyakorlásra
      </button>
    </div>
  );
}
