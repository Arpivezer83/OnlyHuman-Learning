import React from "react";
import Navbar from "./Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Címsor */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Üdv újra az OnlyHuman Learning-ben!</h2>

        {/* Motiváció */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded mb-6">
          🌟 "A haladás kis lépésekből épül fel – a mai tanulás is számít."
        </div>

        {/* Rácsszerkezet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mai cél */}
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">🎯 Mai cél</h3>
            <p>20 perc angol gyakorlás</p>
            <div className="mt-3 h-3 w-full bg-gray-200 rounded">
              <div className="h-3 bg-blue-500 w-2/3 rounded transition-all" />
            </div>
            <p className="text-sm text-gray-500 mt-1">66% teljesítve</p>
          </div>

          {/* Heti statisztika */}
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">📊 Heti statisztika</h3>
            <p>Gyakorlási napok: <strong>5 / 7</strong></p>
            <p>Legaktívabb nap: <strong>Kedd</strong></p>
          </div>

          {/* Következő lépés */}
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">🧭 Következő lépés</h3>
            <p>Gyakorold az új szókincset!</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Ugrás az Angol oldalra
            </button>
          </div>
        </div>

        {/* AI chat doboz */}
        <div className="mt-10 bg-white p-6 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-2">🤖 AI Tutor</h3>
          <p className="text-gray-600 mb-2">Kérdezz tőlem bármit, segítek a tanulásban!</p>
          {/* Esetleg ide jöhet a Chat komponens vagy egy link hozzá */}
          <button className="text-blue-600 hover:underline" onClick={() => alert("Chat még fejlesztés alatt!")}>
            Nyisd meg a chatet →
          </button>
        </div>
      </div>
    </div>
  );
}
