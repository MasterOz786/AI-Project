import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Loader from "./Loader"; // Import the Loader component

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function YouTubeAnalysis({ loading, setLoading, error, setError }) {
  const [videoLink, setVideoLink] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);

  const { ref: illustrationRef, inView: illustrationInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const { ref: inputRef, inView: inputInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const { ref: videoRef, inView: videoInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const { ref: chartRef, inView: chartInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const handleAnalyze = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const videoIdMatch = videoLink.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
      );
      if (!videoIdMatch) {
        throw new Error("Invalid YouTube link");
      }

      const videoId = videoIdMatch[1];
      const response = await axios.post(
        "http://localhost:5000/api/analyze",
        {
          videoId: videoId,
          maxComments: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      setVideoData(data.video);
      setSentimentData(data.sentiment);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const barData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Comment Sentiment",
        data: sentimentData
          ? [
              sentimentData.positive * 100,
              sentimentData.negative * 100,
              sentimentData.neutral * 100,
            ]
          : [0, 0, 0],
        backgroundColor: ["#34D399", "#F87171", "#60A5FA"],
        borderColor: ["#34D399", "#F87171", "#60A5FA"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-deep-purple pt-20">
      {/* Illustration Section */}
      <motion.section
        ref={illustrationRef}
        initial={{ opacity: 0, y: 50 }}
        animate={
          illustrationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 px-6 text-center"
      >
        <div className="relative w-full max-w-4xl mx-auto radial-glow">
          <img
            src="/images/youtube-illustration.jpg"
            alt="YouTube Analysis Illustration"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </motion.section>

      {/* Input Section */}
      <motion.section
        ref={inputRef}
        initial={{ opacity: 0, y: 50 }}
        animate={inputInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 container mx-auto px-6"
      >
        <h2 className="text-3xl font-semibold mb-8 text-center gradient-text">
          Analyze YouTube Comments
        </h2>
        <div className="md:w-1/2 mx-auto">
          <motion.div className="bg-light-gray p-6 rounded-lg gradient-outline glow-bg hover-glow">
            <input
              type="text"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Paste YouTube video link here"
              className="w-full p-3 rounded-lg bg-deep-purple text-white border-none focus:outline-none focus:ring-2 focus:ring-vibrant-purple mb-4"
              disabled={loading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-vibrant-purple text-white p-3 rounded-lg hover:bg-purple-600 disabled:bg-gray-400"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Error Popup */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-32 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50"
        >
          {error}
        </motion.div>
      )}

      {/* Loader */}
      {loading && <Loader />}

      {/* Video Details Section */}
      {videoData && (
        <motion.section
          ref={videoRef}
          initial={{ opacity: 0, y: 50 }}
          animate={videoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-16 container mx-auto px-6"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center gradient-text">
            Video Details
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center md:order-1 order-2"
            >
              <div className="relative w-full max-w-2xl aspect-video overflow-hidden mb-4">
                <img
                  src={videoData.thumbnail}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white text-center">
                {videoData.title}
              </h3>
            </motion.div>
            <div className="md:w-1/2 md:order-2 order-1 flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="bg-light-gray p-6 rounded-lg gradient-outline glow-bg hover-glow flex items-center space-x-4"
                >
                  <span className="text-2xl">👍</span>
                  <div>
                    <p className="text-white text-lg font-semibold">
                      {videoData.likes}
                    </p>
                    <p className="text-gray-300">Likes</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                  className="bg-light-gray p-6 rounded-lg gradient-outline glow-bg hover-glow flex items-center space-x-4"
                >
                  <span className="text-2xl">🔄</span>
                  <div>
                    <p className="text-white text-lg font-semibold">{439}</p>
                    <p className="text-gray-300">Shares</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                  className="bg-light-gray p-6 rounded-lg gradient-outline glow-bg hover-glow flex items-center space-x-4"
                >
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="text-white text-lg font-semibold">
                      {videoData.comments}
                    </p>
                    <p className="text-gray-300">Comments</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Sentiment Bar Chart */}
      {sentimentData && (
        <motion.section
          ref={chartRef}
          initial={{ opacity: 0, y: 50 }}
          animate={chartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-16 container mx-auto px-6"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center gradient-text">
            Comment Sentiment Analysis
          </h2>
          <div className="bg-light-gray p-8 rounded-lg gradient-outline glow-bg">
            <div className="w-full max-w-3xl mx-auto">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      title: {
                        display: true,
                        text: "Percentage (%)",
                        color: "#fff",
                      },
                      ticks: {
                        color: "#fff",
                        callback: (value) => `${value}%`,
                      },
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                      },
                    },
                    x: {
                      ticks: {
                        color: "#fff",
                      },
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: "Sentiment Distribution",
                      color: "#fff",
                      font: {
                        size: 20,
                      },
                    },
                    datalabels: {
                      color: "#fff",
                      anchor: "end",
                      align: "top",
                      font: {
                        size: 16,
                      },
                      formatter: (value) => {
                        const proportion = value / 100;
                        const totalComments = videoData.comments || 1000; // Use actual comments or fallback
                        return `${Math.round(
                          proportion * totalComments
                        )} comments`;
                      },
                    },
                  },
                }}
                height={400}
              />
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}

export default YouTubeAnalysis;
