import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Loader from "./Loader";

function TextAnalysis({ text, setText, handleAnalysis, loading, error }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 container mx-auto px-6"
    >
      {/* Loader */}
      {loading && <Loader />}

      <h2 className="text-3xl font-semibold mb-8 text-center gradient-text">
        Text Sentiment Analysis
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="md:w-1/2 mb-8 md:mb-0 flex justify-center md:order-1 order-2"
        >
          <div className="relative max-w-md w-full p-6 rounded-lg radial-glow">
            <img
              src="/images/text-illustration.jpg"
              alt="Text Analysis Illustration"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </motion.div>
        <div className="md:w-1/2 md:order-2 order-1">
          <motion.div className="bg-light-gray p-6 rounded-lg gradient-outline glow-bg hover-glow">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Text Analysis
            </h2>
            {error && <p className="text-red-400 mb-2">{error}</p>}
            <textarea
              className="w-full p-3 rounded-lg bg-deep-purple text-white border-none focus:outline-none focus:ring-2 focus:ring-vibrant-purple"
              rows="5"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter the text you want to analyze for sentiment. Press ENTER (SHIFT+ENTER) after each sentence. You can input up to 10 lines."
              disabled={loading}
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full bg-vibrant-purple text-white p-3 rounded-lg hover:bg-purple-600 disabled:bg-gray-400"
              onClick={handleAnalysis}
              disabled={loading}
            >
              {"Analyze Sentiment"}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default TextAnalysis;
