import React from "react";
import { motion } from "framer-motion";

export default function BubbleMenuItem({ label, size = "md", onClick }) {
  const sizeClasses = {
    sm: "w-20 h-20 text-sm",
    md: "w-24 h-24 text-base",
    lg: "w-32 h-32 text-lg",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-full bg-gradient-to-br from-purple-300 to-indigo-500 shadow-lg flex items-center justify-center text-white font-bold cursor-pointer transition-all ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {label}
    </motion.div>
  );
}
