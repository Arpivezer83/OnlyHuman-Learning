import React, { useState } from "react";
import SpeakChat from "../components/SpeakChat"; // <-- fontos
import OwlMascot from "../components/Mascots/OwlMascot";
import { useNavigate } from "react-router-dom";


export default function Practice() {
  const [selectedTopic, setSelectedTopic] = useState("angol");
  const [points, setPoints] = useState(1250);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 relative">
      <h1 className="text-4xl font-bold text-center mb-6">🎯 Gyakorlás</h1>
      <SpeakChat userId="arpad123" topic="angol" />
      <div className="text-right mb-4">
        <span className="text-md">💰 Pontjaid: <strong>{points}</strong></span>
      </div>

      <div className="mb-6 text-center">
        <label className="mr-2 font-medium">Téma:</label>
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="angol">Angol</option>
          <option value="matek">Matek</option>
          <option value="pszicho">Pszichológia</option>
          <option value="custom">Egyéb...</option>
        </select>
      </div>
      <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6">🧠 Gyakorlás</h1>

      <button onClick={() => navigate("/practice/english")} className="bg-blue-600 text-white px-4 py-2 rounded">
        🇬🇧 Angol gyakorlás
      </button>

      <button onClick={() => navigate("/practice/math")} className="bg-purple-600 text-white px-4 py-2 rounded">
        📐 Matek gyakorlás
      </button>

      <button onClick={() => navigate("/practice/coaching")} className="bg-green-600 text-white px-4 py-2 rounded">
        🧘‍♂️ Önismeret / coaching
      </button>
      </div>
      <div>
          <button
            onClick={() => navigate("/notebook")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            📘 Nyisd meg az AI feladatfüzetet
          </button>
      </div>

      {/* Itt a beszéd-alapú AI chat */}
      <div className="absolute bottom-4 right-4">
        <OwlMascot />
      </div>
    </div>
  );
}
