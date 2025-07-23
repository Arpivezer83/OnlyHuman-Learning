import React, { useState } from "react";
import { motion } from "framer-motion";

export default function OnlyHumanLearning() {
  const [activeTab, setActiveTab] = useState("practice");
  const [agentType, setAgentType] = useState("math");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { role: "user", content: input }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "(Válasz a " + input + " kérdésre...)" }]);
    }, 1000);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center px-2 md:px-6 py-4">
      <img src="/onlyhuman-logo.png" alt="OnlyHuman" className="w-48 mb-4" />

      <nav className="flex flex-wrap gap-2 md:gap-4 mb-6 border-b pb-2 justify-center">
        <button onClick={() => setActiveTab("practice")} className={`px-4 py-2 rounded-full ${activeTab === "practice" ? "bg-green-200" : "bg-white"}`}>Gyakorlás</button>
        <button onClick={() => setActiveTab("notebook")} className={`px-4 py-2 rounded-full ${activeTab === "notebook" ? "bg-blue-200" : "bg-white"}`}>Digitális Füzet</button>
        <button onClick={() => setActiveTab("upload")} className={`px-4 py-2 rounded-full ${activeTab === "upload" ? "bg-yellow-200" : "bg-white"}`}>Feltöltés</button>
        <button onClick={() => setActiveTab("journal")} className={`px-4 py-2 rounded-full ${activeTab === "journal" ? "bg-pink-200" : "bg-white"}`}>Napló</button>
        <button onClick={() => setActiveTab("finance")} className={`px-4 py-2 rounded-full ${activeTab === "finance" ? "bg-purple-200" : "bg-white"}`}>Pénzügyek</button>
        <button onClick={() => setActiveTab("calendar")} className={`px-4 py-2 rounded-full ${activeTab === "calendar" ? "bg-gray-200" : "bg-white"}`}>Foglalás</button>
      </nav>

      {activeTab === "practice" && (
        <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-4 md:p-6 flex flex-col">
          <div className="flex gap-2 md:gap-4 mb-4 justify-center flex-wrap">
            <button onClick={() => setAgentType("math")} className={`px-4 py-2 rounded-full border ${agentType === "math" ? "bg-green-200" : "bg-white"}`}>Matek</button>
            <button onClick={() => setAgentType("english")} className={`px-4 py-2 rounded-full border ${agentType === "english" ? "bg-blue-200" : "bg-white"}`}>Angol</button>
            <button onClick={() => setAgentType("coach")} className={`px-4 py-2 rounded-full border ${agentType === "coach" ? "bg-yellow-200" : "bg-white"}`}>Coach</button>
          </div>

          <div className="h-80 overflow-y-auto space-y-2 mb-4">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-xl max-w-[80%] md:max-w-xs ${msg.role === "user" ? "bg-green-100 self-end" : "bg-gray-200 self-start"}`}
              >
                {msg.content}
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 border rounded-full"
              placeholder="Írj ide..."
            />
            <button onClick={handleSend} className="bg-black text-white px-4 py-2 rounded-full">Küldés</button>
          </div>
        </div>
      )}

      {activeTab !== "practice" && (
        <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-4 md:p-6 text-center">
          <p className="text-gray-500">{activeTab === "notebook" && "(Digitális Füzet - Fejlesztés alatt)"}</p>
          <p className="text-gray-500">{activeTab === "upload" && "(Feltöltés - Fejlesztés alatt)"}</p>
          <p className="text-gray-500">{activeTab === "journal" && "(Napló - Fejlesztés alatt)"}</p>
          <p className="text-gray-500">{activeTab === "finance" && "(Pénzügyek - Fejlesztés alatt)"}</p>
          <p className="text-gray-500">{activeTab === "calendar" && "(Foglalás - Fejlesztés alatt)"}</p>
        </div>
      )}

      <footer className="mt-8 text-sm text-gray-500">© OnlyHuman Learning 2025</footer>
    </div>
  );
}
