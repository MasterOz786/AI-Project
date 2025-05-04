import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-deep-purple bg-opacity-80 z-50">
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute w-full h-full border-4 border-t-vibrant-purple border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute w-20 h-20 border-4 border-t-purple-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold gradient-text">
          Analyzing...
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
