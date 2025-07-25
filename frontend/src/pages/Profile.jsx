import React, { useState, useEffect } from "react";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    parent: "",
    bankAccount: "",
    billingAddress: "",
    age: "",
    grade: "",
    school: "",
    contactOptions: "",
    homeAddress: "",
    goals: ""
  });

  // 🔄 Betöltés a backendről (ideiglenesen teljes URL-el, proxy nélkül)
  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Hiba a backend elérésében");
        return res.json();
      })
      .then((data) => setForm(data))
      .catch((err) =>
        console.error("🔴 Hiba a profil betöltésekor:", err.message)
      );
  }, []);

  // 💾 Mentés a backendre (ideiglenesen teljes URL-el, proxy nélkül)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("✅ A profil adatai elmentve!");
      } else {
        const data = await res.json();
        alert(`❌ Hiba: ${data.error || "Ismeretlen hiba"}`);
      }
    } catch (err) {
      console.error("🔴 Mentési hiba:", err.message);
      alert("⚠️ Nem sikerült elmenteni a profil adatokat.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-6">👤 Profilom</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          ["Név", "name"],
          ["E-mail", "email", "email"],
          ["Telefon", "phone"],
          ["Szülő / Gondviselő", "parent"],
          ["Számlaszám", "bankAccount"],
          ["Számlázási cím", "billingAddress"],
          ["Életkor", "age"],
          ["Osztály", "grade"],
          ["Iskola", "school"]
        ].map(([label, name, type = "text"]) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Egyéb elérhetőségek</label>
          <input
            name="contactOptions"
            value={form.contactOptions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Lakcím</label>
          <input
            name="homeAddress"
            value={form.homeAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Céljaim</label>
          <textarea
            name="goals"
            value={form.goals}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
          ></textarea>
        </div>

        <div className="md:col-span-2 text-right">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Mentés
          </button>
        </div>
      </form>
    </div>
  );
}
