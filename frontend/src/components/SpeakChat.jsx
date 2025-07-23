import React, { useState } from "react";

export default function SpeakChat() {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("SpeechRecognition nem támogatott ebben a böngészőben.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      getAIResponse(text);
    };

    recognition.start();
  };

  const getAIResponse = async (userInput) => {
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      const aiMessage = data.response || "Nem tudtam választ adni.";
      setResponse(aiMessage);
      speak(aiMessage);
    } catch (err) {
      console.error("Hiba az AI válasznál:", err);
    }
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    synth.speak(utter);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-10">
      <h3 className="text-xl font-semibold mb-4">🗣️ AI Angol Beszélgetés</h3>
      <button
        onClick={startListening}
        className={`px-4 py-2 rounded text-white ${isListening ? "bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {isListening ? "Figyelek..." : "Beszélj angolul"}
      </button>

      <div className="mt-4">
        {transcript && (
          <div className="mb-2">
            <strong>Te mondtad:</strong> <span className="italic">{transcript}</span>
          </div>
        )}
        {response && (
          <div className="bg-gray-100 p-3 rounded">
            <strong>AI válasza:</strong> {response}
          </div>
        )}
      </div>
    </div>
  );
}
