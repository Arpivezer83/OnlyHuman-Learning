import React, { useEffect, useState } from "react";
import Chat from "./Chat";

export default function EnglishPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Angol AI Gyakorlás</h1>
      {user ? (
        <Chat user={user} />
      ) : (
        <p className="text-red-500">Nem vagy bejelentkezve.</p>
      )}
    </div>
  );
}
