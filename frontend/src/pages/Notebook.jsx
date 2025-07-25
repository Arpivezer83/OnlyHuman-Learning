import React, { useState } from "react";

export default function Notebook() {
  const [task, setTask] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const getTask = async () => {
    setLoading(true);
    setFeedback("");
    try {
      const res = await fetch("http://localhost:5000/api/notebook-task");
      const data = await res.json();
      setTask(data.task || "Nem sikerült feladatot generálni.");
    } catch (err) {
      console.error("Hiba a feladat lekérésekor:", err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/notebook-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, answer })
      });
      const data = await res.json();
      setFeedback(data.feedback || "Nincs visszajelzés.");
    } catch (err) {
      console.error("Hiba a visszajelzésnél:", err);
      setFeedback("❌ Hiba történt a válasz elküldésekor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">📘 AI Feladatfüzet</h2>

      <button
        onClick={getTask}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mb-4"
      >
        🎲 Kérek egy új feladatot
      </button>

      {task && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">📝 Feladat:</h3>
          <p className="bg-gray-100 p-3 rounded">{task}</p>
        </div>
      )}

      {task && (
        <div className="mb-6">
          <label className="block font-medium mb-2">✍️ Válaszod:</label>
          <textarea
            rows="5"
            className="w-full p-3 border rounded"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>

          <button
            onClick={submitAnswer}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            📤 Küldés
          </button>
        </div>
      )}

      {feedback && (
        <div className="bg-green-100 p-4 rounded shadow">
          <h4 className="font-bold">🤖 AI visszajelzés:</h4>
          <p>{feedback}</p>
        </div>
      )}

      {loading && <p className="mt-4 text-gray-500">⏳ Dolgozom...</p>}
    </div>
  );
}
