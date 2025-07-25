// src/pages/Booking.jsx
import React, { useState } from "react";

const days = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"];
const hours = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

export default function Booking() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (day, hour) => {
    setSelected({ day, hour });
  };

  const handleBooking = () => {
    if (!selected) return;
    alert(`Lefoglaltál egy időpontot: ${selected.day} ${selected.hour}`);
    setSelected(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-4">🗓️ Órafoglalás</h2>
      <p className="mb-4 text-gray-700">Válassz egy szabad időpontot a hét folyamán!</p>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100"></th>
              {days.map((day) => (
                <th key={day} className="border p-2 bg-gray-100">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="border p-2 font-semibold bg-gray-50">{hour}</td>
                {days.map((day) => {
                  const isSelected = selected?.day === day && selected?.hour === hour;
                  return (
                    <td
                      key={day + hour}
                      className={`border p-2 text-center cursor-pointer hover:bg-blue-200 ${isSelected ? "bg-blue-500 text-white" : ""}`}
                      onClick={() => handleSelect(day, hour)}
                    >
                      {isSelected ? "✔" : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleBooking}
        disabled={!selected}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Foglalás megerősítése
      </button>
    </div>
  );
}
