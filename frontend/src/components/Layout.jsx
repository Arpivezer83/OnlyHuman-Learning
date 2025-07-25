import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">OnlyHuman Learning</h1>
        <nav>
          <Link to="/dashboard" className="mr-4 text-blue-600 hover:underline">
            Főoldal
          </Link>
          <Link to="/english" className="mr-4 text-blue-600 hover:underline">
            Angol
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="text-red-500 hover:underline"
          >
            Kilépés
          </button>
        </nav>
      </header>

      <main className="p-4">{children}</main>
    </div>
  );
}
