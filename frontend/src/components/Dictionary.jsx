import React, { useState, useEffect } from "react";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [words, setWords] = useState([]);

  // Betöltés localStorage-ból
  useEffect(() => {
    const stored = localStorage.getItem("dictionaryWords");
    if (stored) {
      setWords(JSON.parse(stored));
    }
  }, []);

  // Mentés localStorage-ba
  useEffect(() => {
    localStorage.setItem("dictionaryWords", JSON.stringify(words));
  }, [words]);

  const addWord = () => {
    if (!word.trim()) return;
    const newEntry = { word, meaning, example };
    setWords([newEntry, ...words]);
    setWord("");
    setMeaning("");
    setExample("");
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-10">
      <h3 className="text-xl font-semibold mb-4">📖 Saját szótár</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Angol szó"
          className="border p-2 rounded"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <input
          type="text"
          placeholder="Jelentés (magyarul)"
          className="border p-2 rounded"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
        />
        <input
          type="text"
          placeholder="Példamondat"
          className="border p-2 rounded"
          value={example}
          onChange={(e) => setExample(e.target.value)}
        />
      </div>

      <button
        onClick={addWord}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
      >
        Hozzáadás
      </button>

      {words.length > 0 ? (
        <ul className="space-y-2">
          {words.map((entry, index) => (
            <li key={index} className="border p-3 rounded bg-gray-50">
              <strong className="text-blue-700">{entry.word}</strong> – {entry.meaning}
              {entry.example && (
                <div className="text-sm text-gray-600 mt-1 italic">"{entry.example}"</div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Még nincs elmentett szó.</p>
      )}
    </div>
  );
}
