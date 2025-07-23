import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"; // létezik már
import LandingPage from "./components/LandingPage"; // importáld

// ...



// Helyőrzők későbbi oldalakhoz:
const EnglishPage = () => <div className="p-4">Angol gyakorlás oldal – hamarosan</div>;
const MathPage = () => <div className="p-4">Matek oldal – hamarosan</div>;

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/english" element={
          <ProtectedRoute>
            <EnglishPage />
          </ProtectedRoute>
        } />
        
        <Route path="/math" element={
          <ProtectedRoute>
            <MathPage />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<div className="p-4">404 – oldal nem található</div>} />
      </Routes>
    </Router>
  );
}
