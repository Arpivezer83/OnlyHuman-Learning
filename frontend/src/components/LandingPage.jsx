import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 text-center px-4">
      {/* OnlyHuman logó vagy szöveg */}
      <h2 className="text-xl text-gray-500 mb-2 tracking-wide italic">OnlyHuman</h2>

      {/* Learning cím */}
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">Learning</h1>

      {/* Leírás (opcionális) */}
      <p className="text-md text-gray-600 max-w-md mb-8">
        Fedezd fel, tanulj, fejlődj. AI-alapú tanulási élmény az emberi értékek jegyében.
      </p>

      {/* Belépés gomb */}
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
      >
        Belépés
      </button>
    </div>
  );
}
