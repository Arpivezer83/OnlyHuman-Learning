import React, { useState } from "react";
import Chat from "./components/Chat";

export default function App() {
  const [input, setInput] = useState("");
  const user = "user1"; // Teszt user ID, lehet dinamikusan is kezelni

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black p-6">

      {/* LOGO */}
      <img src="/onlyhuman_logo.png" alt="OnlyHuman" className="w-96 mb-8" />

      {/* Menü gombok */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button className="border p-3 rounded bg-gray-100 hover:bg-gray-200">Gyakorlás</button>
        <button className="border p-3 rounded bg-gray-100 hover:bg-gray-200">Digitális Füzet</button>
        <button className="border p-3 rounded bg-gray-100 hover:bg-gray-200">Feltöltés</button>
        <button className="border p-3 rounded bg-gray-100 hover:bg-gray-200">Napló</button>
        <button className="border p-3 rounded bg-gray-100 hover:bg-gray-200">Pénzügyek</button>
        <button className="border p-3 rounded bg-gray-100 hover:bg-gray-200">Foglalás</button>
      </div>

      {/* Chat komponens visszakötve */}
      <Chat input={input} setInput={setInput} user={user} />

      <p className="text-sm text-gray-500 mt-8">© OnlyHuman Learning 2025</p>
    </div>
  );
}
