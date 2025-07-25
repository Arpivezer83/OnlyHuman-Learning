import React, { useEffect, useRef, useState } from "react";
import owlImage from "../assets/owl.png";

export default function OwlMascot() {
  const owlRef = useRef(null);
  const [animationClass, setAnimationClass] = useState("");
  const audioRef = useRef(null);

  const playHooSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const triggerRandomAnimation = () => {
    const animations = ["fly", "float", "wiggle"];
    const chosen = animations[Math.floor(Math.random() * animations.length)];
    setAnimationClass(chosen);
    setTimeout(() => setAnimationClass(""), 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      triggerRandomAnimation();
    }, 15000 + Math.random() * 15000); // 15–30 mp-enként
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    playHooSound();
    setAnimationClass("hoot");
    setTimeout(() => setAnimationClass(""), 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 cursor-pointer" onClick={handleClick}>
      <img
        ref={owlRef}
        src={owlImage}
        alt="Owl Mascot"
        className={`w-24 transition-transform duration-500 ease-in-out ${animationClass}`}
      />
      <audio ref={audioRef} src="/sounds/bagolyhang.mp3" preload="auto" />
    </div>
  );
}
