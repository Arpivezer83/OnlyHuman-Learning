import React, { useState } from "react";
import SpeakChat from "../components/SpeakChat"; // <-- fontos
import OwlMascot from "../components/OwlMascot";

export default function Practice() {
  const [selectedTopic, setSelectedTopic] = useState("angol");
  const [points, setPoints] = useState(1250);

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

      {/* Itt a beszéd-alapú AI chat */}
      <div className="absolute bottom-4 right-4">
        <OwlMascot />
      </div>
    </div>
  );
}
