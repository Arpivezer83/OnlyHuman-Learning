import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Dictionary from "./Dictionary";
import SpeakChat from "./SpeakChat";


export default function EnglishPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🇬🇧 Angol gyakorlás</h2>

        <div className="bg-white p-6 rounded shadow-md mb-6">
          <p className="text-lg mb-2">🎧 Hallgass meg egy mondatot, és ismételd el!</p>
          <button
            onClick={() => alert("Hang alapú gyakorlás később jön!")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Gyakorlás indítása
          </button>
        </div>

        <div className="bg-white p-6 rounded shadow-md mb-6">
          <p className="text-lg mb-2">✍️ Próbálj lefordítani egy mondatot magyarból angolra!</p>
          <button
            onClick={() => alert("AI fordítás gyakorlás hamarosan!")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Fordítás gyakorlása
          </button>
        </div>
        <div>
            <SpeakChat />
        </div>
        <div>
            <Dictionary />
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:underline"
          >
            ← Vissza a dashboardra
          </button>
        </div>
      </div>
    </div>
  );
}
