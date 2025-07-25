import React, { useEffect, useRef, useState } from "react";
import owlImage from "../../assets/owl.png";

export default function OwlMascot() {
  const owlRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (owlRef.current) {
        owlRef.current.classList.add("animate-fly");
        setTimeout(() => owlRef.current.classList.remove("animate-fly"), 1000);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      ref={owlRef}
      src={owlImage}
      alt="Owl Mascot"
      className={`w-20 h-20 fixed bottom-5 right-5 transition-transform duration-500 cursor-pointer ${
        hovering ? "scale-125 rotate-12" : ""
      }`}
      onClick={() => alert("Huhúú! 🦉")}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    />
  );
}
