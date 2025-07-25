import React, { useEffect, useRef, useState } from "react";
import penguinImage from "../../assets/penguin.png";

export default function PenguinMascot() {
  const penguinRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (penguinRef.current) {
        penguinRef.current.classList.add("animate-spin");
        setTimeout(() => penguinRef.current.classList.remove("animate-spin"), 1000);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      ref={penguinRef}
      src={penguinImage}
      alt="Penguin Mascot"
      className={`w-20 h-20 fixed bottom-5 left-5 transition-transform duration-500 cursor-pointer ${
        hovering ? "scale-125 rotate-6" : ""
      }`}
      onClick={() => alert("Pinguin csúszik! 🐧")}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    />
  );
}
