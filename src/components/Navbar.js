import React from "react";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="bg-deep-purple text-white p-4 flex justify-between items-center"
    >
      <div className="flex items-center space-x-2">
        <FaRobot className="text-vibrant-purple text-2xl" />
        <span className="text-xl font-bold">SentimentX</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-vibrant-purple hover:underline">Log in</button>
        <button className="bg-vibrant-purple text-white px-4 py-2 rounded-full hover:bg-purple-600">
          Try for free
        </button>
      </div>
    </motion.nav>
  );
}

export default Navbar;
