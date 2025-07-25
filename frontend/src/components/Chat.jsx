import React, { useState } from "react";

export default function Chat({ user }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [agentType, setAgentType] = useState("english");
  const [loading, setLoading] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user_id = storedUser?.id || "guest_user";

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          agent_type: agentType,
          message: input,
        }),
      });

      const data = await response.json();

      if (response.ok && data.response) {
        const botReply = { role: "assistant", content: data.response };
        setMessages((prev) => [...prev, botReply]);
        speak(data.response);
      } else {
        const errorMsg = "[Hiba: Nem érkezett válasz]";
        setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
        speak(errorMsg);
      }
    } catch (err) {
      console.error("Chat error:", err);
      const netErr = "[Hálózati hiba történt]";
      setMessages((prev) => [...prev, { role: "assistant", content: netErr }]);
      speak(netErr);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <div className="mb-2">
        <label className="mr-2 font-semibold">Típus:</label>
        <select value={agentType} onChange={(e) => setAgentType(e.target.value)}>
          <option value="english">Angol</option>
          <option value="math">Matek</option>
          <option value="coach">Coach</option>
        </select>
      </div>

      <div className="border p-2 h-64 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <strong>{msg.role === "user" ? "Te:" : "AI:"}</strong> {msg.content}
          </div>
        ))}
      </div>

      <input
        className="border p-2 w-full mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Írj valamit..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Küldés..." : "Küldés"}
      </button>
    </div>
  );
}
