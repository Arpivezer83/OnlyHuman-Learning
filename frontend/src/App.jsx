import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Contact from "./pages/Contact"; // <-- Ez legyen a pages-ből!
import Booking from "./pages/Booking"; // <-- új import
import Profile from "./pages/Profile";
import Notebook from "./pages/Notebook"; // új import
import EnglishPractice from "./pages/PracticeSections/EnglishPractice";
import MathPractice from "./pages/PracticeSections/MathPractice";
import CoachingPractice from "./pages/PracticeSections/CoachingPractice";






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/contact" element={<Contact />} /> {/* 👈 ez kell! */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/practice/english" element={<EnglishPractice />} />
        <Route path="/practice/math" element={<MathPractice />} />
        <Route path="/practice/coaching" element={<CoachingPractice />} />
        <Route path="/notebook" element={<Notebook />} />
      </Routes>
    </Router>
  );
}

export default App;
