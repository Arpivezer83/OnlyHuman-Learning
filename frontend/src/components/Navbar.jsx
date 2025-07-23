import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold text-blue-700 cursor-pointer"
      >
        OnlyHuman Learning
      </h1>

      <div className="flex gap-4">
        <button onClick={() => navigate("/dashboard")} className="text-gray-700 hover:text-blue-600">
          Kezdőlap
        </button>
        <button onClick={() => navigate("/english")} className="text-gray-700 hover:text-blue-600">
          Angol
        </button>
        <button onClick={() => navigate("/math")} className="text-gray-700 hover:text-blue-600">
          Matek
        </button>
        <button onClick={handleLogout} className="text-red-600 hover:underline">
          Kijelentkezés
        </button>
      </div>
    </nav>
  );
}
