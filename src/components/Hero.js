import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white py-16 flex flex-col md:flex-row items-center justify-between container mx-auto px-6"
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:w-1/2 mb-8 md:mb-0"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Sentiment Analysis Tool – Free!
        </h1>
        <p className="text-lg mb-6">
          Input your text, audio, or video to generate the sentiment – positive,
          negative, or neutral – with our Sentiment Analysis Tool. Analyze up to
          10 entries at once!
        </p>
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:w-1/2 flex justify-center"
      >
        <div className="relative max-w-md w-full p-6 rounded-lg radial-glow">
          <img
            src="/images/sentiment-illustration.jpg"
            alt="Sentiment Analysis Illustration"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
