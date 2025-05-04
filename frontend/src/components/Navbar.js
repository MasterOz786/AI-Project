import React from "react";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="bg-deep-purple text-white p-4 flex justify-between items-center"
    >
      <Link to="/">
        <div className="flex items-center space-x-2">
          <FaRobot className="text-vibrant-purple text-2xl" />
          <span className="text-xl font-bold">SentimentX</span>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          to="/youtube-analysis"
          className="text-vibrant-purple hover:underline"
        >
          Analyze YouTube Comments
        </Link>
        <button className="bg-vibrant-purple text-white px-4 py-2 rounded-full hover:bg-purple-600">
          Try for free
        </button>
      </div>
    </motion.nav>
  );
}

export default Navbar;
