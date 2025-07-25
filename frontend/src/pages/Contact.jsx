import React, { useState } from "react";
import {
  FaFacebookMessenger,
  FaViber,
  FaEnvelope,
  FaPhone,
  FaLink,
  FaGoogle,
  FaMicrosoft,
} from "react-icons/fa";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Kapcsolatfelvétel:", { name, email, message });
    alert("Köszönöm az üzeneted! Hamarosan válaszolok. 😊");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white/80 rounded-2xl shadow-lg backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-4 text-blue-800">📬 Kapcsolatfelvétel</h2>

      <p className="mb-4 text-gray-700">
        Ha kérdésed van, vagy szeretnél <strong>órát foglalni</strong>, az alábbi űrlapon is írhatsz.
        <br />
        <span className="font-semibold">Órákat tartok online a következő platformokon:</span>{" "}
        Google Meet, Facebook Messenger, Microsoft Teams, Viber – vagy más, amit te javasolsz.
      </p>

      {/* Kapcsolati űrlap */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Név</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">E-mail</label>
          <input
            type="email"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Üzenet</label>
          <textarea
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Küldés
        </button>
      </form>

      <hr className="my-6" />

      {/* Közvetlen elérhetőségek */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">📱 Elérsz ezeken is</h3>

        <div className="flex items-center gap-3 text-blue-700">
          <FaFacebookMessenger />{" "}
          <span>
            Messenger:{" "}
            <a href="https://m.me/yourusername" className="underline hover:text-blue-900">
              m.me/yourusername
            </a>
          </span>
        </div>

        <div className="flex items-center gap-3 text-purple-600">
          <FaViber /> <span>Viber: +36 30 146 3273</span>
        </div>

        <div className="flex items-center gap-3 text-red-600">
          <FaEnvelope />{" "}
          <span>
            Email:{" "}
            <a href="mailto:info@onlyhuman.hu" className="underline">
              info@onlyhuman.hu
            </a>
          </span>
        </div>

        <div className="flex items-center gap-3 text-green-600">
          <FaPhone /> <span>Telefon: +36 30 123 4567</span>
        </div>

        <div className="flex items-center gap-3 text-gray-800">
          <FaLink />{" "}
          <span>
            Weboldal:{" "}
            <a href="https://onlyhuman.hu" className="underline hover:text-black">
              onlyhuman.hu
            </a>
          </span>
        </div>
      </div>

      {/* Platform lista */}
      <div className="mt-6">
        <h4 className="text-md font-semibold mb-2">🎓 Elérhető platformok óratartásra:</h4>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>
            <FaGoogle className="inline mr-2 text-green-600" />
            Google Meet
          </li>
          <li>
            <FaFacebookMessenger className="inline mr-2 text-blue-600" />
            Facebook Messenger
          </li>
          <li>
            <FaMicrosoft className="inline mr-2 text-indigo-700" />
            Microsoft Teams
          </li>
          <li>
            <FaViber className="inline mr-2 text-purple-600" />
            Viber, Zoom, Discord – kérés szerint 😊
          </li>
        </ul>
      </div>
    </div>
  );
}
