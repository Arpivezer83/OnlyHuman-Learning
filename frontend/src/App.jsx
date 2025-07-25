import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Contact from "./pages/Contact"; // <-- Ez legyen a pages-ből!
import Booking from "./pages/Booking"; // <-- új import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/contact" element={<Contact />} /> {/* 👈 ez kell! */}
        <Route path="/booking" element={<Booking />} />

      </Routes>
    </Router>
  );
}

export default App;
