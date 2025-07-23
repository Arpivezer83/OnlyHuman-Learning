import React, { useState } from 'react';

export default function Chat({ input, setInput, user }) {
  const [messages, setMessages] = useState([]);
  const [agentType, setAgentType] = useState("english"); // <-- Új állapot

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user,
          agent_type: agentType, // <-- Dinamikus választás
          message: input
        })
      });

      const data = await response.json();

      if (data.response) {
        const botMessage = { role: "assistant", content: data.response };
        setMessages(prev => [...prev, botMessage]);
        speak(data.response);
      } else if (data.error) {
        const errorMessage = { role: "assistant", content: "Hiba: " + data.error };
        setMessages(prev => [...prev, errorMessage]);
      }

      setInput('');

    } catch (err) {
      console.error("Fetch hiba:", err);
      setMessages(prev => [...prev, { role: "assistant", content: "Hálózati hiba történt." }]);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4 text-center">OnlyHuman Chat</h1>

      {/* Agent kiválasztó */}
      <div className="flex justify-center gap-4 mb-4">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            value="math"
            checked={agentType === "math"}
            onChange={() => setAgentType("math")}
          />
          <span>Matek</span>
        </label>

        <label className="flex items-center gap-1">
          <input
            type="radio"
            value="english"
            checked={agentType === "english"}
            onChange={() => setAgentType("english")}
          />
          <span>Angol</span>
        </label>

        <label className="flex items-center gap-1">
          <input
            type="radio"
            value="coach"
            checked={agentType === "coach"}
            onChange={() => setAgentType("coach")}
          />
          <span>Coach</span>
        </label>
      </div>

      <div className="border p-4 h-80 overflow-y-scroll bg-gray-100 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === 'user' ? 'text-blue-600 mb-2' : 'text-green-600 mb-2'}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Írj vagy beszélj..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">
          Küldés
        </button>
      </div>
    </div>
  );
}
