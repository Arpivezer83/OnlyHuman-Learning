import React from 'react';

export default function SpeechButton({ onResult }) {
  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("A böngésződ nem támogatja a beszédfelismerést!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.start();
  };

  return (
    <button onClick={startRecognition} className="bg-purple-500 text-white p-2 rounded mt-4 block mx-auto">
      🎤 Beszélj angolul
    </button>
  );
}
