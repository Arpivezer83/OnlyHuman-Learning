import React, { useEffect, useRef, useState } from "react";
import turtleImage from "../../assets/turtle.png";

export default function TurtleMascot() {
  const turtleRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (turtleRef.current) {
        turtleRef.current.classList.add("animate-bounce");
        setTimeout(() => turtleRef.current.classList.remove("animate-bounce"), 1000);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      ref={turtleRef}
      src={turtleImage}
      alt="Turtle Mascot"
      className={`w-20 h-20 fixed bottom-24 left-10 transition-transform duration-500 cursor-pointer ${
        hovering ? "scale-110 rotate-3" : ""
      }`}
      onClick={() => alert("Lassú és bölcs 🐢")}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    />
  );
}
