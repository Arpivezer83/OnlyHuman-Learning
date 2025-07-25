import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BubbleMenuItem from "../components/BubbleMenuItem";
import OwlMascot from "../components/OwlMascot";

export default function Dashboard() {
  const [today, setToday] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    const formatted = date.toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setToday(formatted);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-100 text-gray-800 relative">
      {/* Fejléc: OnlyHuman + Learning */}
      <header className="text-center pt-6">
        <h1 className="text-2xl italic font-cursive">OnlyHuman</h1>
        <h2 className="text-5xl font-extrabold tracking-tight">Learning</h2>
      </header>

      {/* Fő tartalom: Bal kártya + Jobb körmenü */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 px-6 py-10">
        {/* Bal oldali üdvözlő konzol */}
        <div className="bg-white/80 shadow-xl rounded-2xl p-6 w-full md:w-1/3 space-y-4 backdrop-blur-sm">
          <p className="text-xl">Szia Árpád! 👋</p>
          <p>📅 <strong>{today}</strong></p>
          <p>💰 Egyenleged: <strong>1 250 pont</strong></p>
          <p>📘 Következő órád: <strong>Holnap 16:00 – Angol</strong></p>
          <p className="italic text-sm text-gray-600">🌟 „Ne feledd, minden nap egy új lehetőség!”</p>

          <div className="border-t pt-4 mt-4 text-sm text-gray-700">
            <p className="font-semibold mb-1">📞 Elérhetsz órára vagy kérdés esetén:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Messenger</li>
              <li>Google Meet</li>
              <li>Microsoft Teams</li>
              <li>Viber</li>
              <li>vagy bárhol máshol – egyeztessünk! 🤝</li>
            </ul>
          </div>
        </div>

        {/* Jobb oldali animált körmenü */}
        <div className="relative w-full md:w-2/3 flex flex-wrap justify-center items-center gap-6 mt-4 md:mt-0">
          <BubbleMenuItem label="Gyakorlás" size="lg" onClick={() => navigate("/practice")} />
          <BubbleMenuItem label="Profil" onClick={() => navigate("/profile")} />
          <BubbleMenuItem label="Napló" onClick={() => navigate("/journal")} />
          <BubbleMenuItem label="Foglalás" onClick={() => navigate("/booking")} />
          <BubbleMenuItem label="Tananyagok" onClick={() => navigate("/materials")} />
          <BubbleMenuItem label="Kapcsolat & Óratartás" onClick={() => navigate("/contact")} />
          <BubbleMenuItem label="Küldetés" onClick={() => navigate("/mission")} />
        </div>
      </div>

      {/* Bagoly figura */}
      <OwlMascot />
    </div>
  );
}
