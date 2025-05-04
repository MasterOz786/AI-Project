import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AudioAnalysis({ setAudioFile, handleAnalysis, loading, error }) {
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
      <h2 className="text-3xl font-semibold mb-8 text-center gradient-text">
        Audio Sentiment Analysis
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 md:order-1 order-2">
          <motion.div className="bg-light-gray p-6 rounded-lg gradient-outline glow-bg hover-glow">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Audio Analysis
            </h2>
            {error && <p className="text-red-400 mb-2">{error}</p>}
            <motion.input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files[0])}
              className="w-full p-3 rounded-lg bg-deep-purple text-white border-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-vibrant-purple file:text-white hover:file:bg-purple-600"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full bg-vibrant-purple text-white p-3 rounded-lg hover:bg-purple-600 disabled:bg-gray-400"
              onClick={handleAnalysis}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Sentiment"}
            </motion.button>
          </motion.div>
        </div>
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="md:w-1/2 flex justify-center md:order-2 order-1"
        >
          <div className="relative max-w-md w-full p-6 rounded-lg radial-glow">
            <img
              src="/images/audio-illustration.jpg"
              alt="Audio Analysis Illustration"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AudioAnalysis;
