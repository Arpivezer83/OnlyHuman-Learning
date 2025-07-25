import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Contact from "./pages/Contact"; // <-- Ez legyen a pages-ből!
import Booking from "./pages/Booking"; // <-- új import
import Profile from "./pages/Profile";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/contact" element={<Contact />} /> {/* 👈 ez kell! */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={Profile} />
      </Routes>
    </Router>
  );
}

export default App;
