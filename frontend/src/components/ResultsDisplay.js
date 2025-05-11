import React from "react";
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
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ResultsDisplay({ results }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Function to generate chart data for results with sentiment scores
  const getChartData = (result) => {
    return {
      labels: ["Positive", "Negative", "Neutral"],
      datasets: [
        {
          label: "Sentiment Scores",
          data: [
            result.sentiment?.positive || 0,
            result.sentiment?.negative || 0,
            result.sentiment?.neutral || 0,
          ],
          backgroundColor: ["#34D399", "#F87171", "#60A5FA"],
          borderColor: ["#34D399", "#F87171", "#60A5FA"],
          borderWidth: 1,
        },
      ],
    };
  };

  // Check if the latest result has sentiment scores for chart rendering
  const shouldShowChart = (result) => {
    return (
      result &&
      result.sentiment &&
      (typeof result.sentiment.positive === "number" ||
        typeof result.sentiment.negative === "number" ||
        typeof result.sentiment.neutral === "number")
    );
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 container mx-auto px-6"
    >
      <h2 className="text-3xl font-semibold mb-8 text-center gradient-text">
        Analysis Results
      </h2>
      {results.length > 0 ? (
        <div className="bg-light-gray p-6 rounded-lg gradient-outline glow-bg">
          {/* Show chart only for results with sentiment scores (e.g., YouTube) */}
          {shouldShowChart(results[results.length - 1]) && (
            <div className="w-full max-w-md mx-auto mb-6">
              <Bar
                data={getChartData(results[results.length - 1])}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          )}
          <div className="grid grid-cols-1 gap-4">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-vibrant-purple p-6 rounded-lg bg-deep-purple text-white shadow-lg"
              >
                {result.type === "text" ? (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-vibrant-purple">
                      Text Analysis
                    </h3>
                    <p className="text-lg">
                      <strong>Text:</strong> {result.text || "N/A"}
                    </p>
                    <p className="text-lg">
                      <strong>Sentiment:</strong> {result.sentiment || "N/A"}
                    </p>
                    <p className="text-lg">
                      <strong>Confidence:</strong> {result.confidence || "N/A"}
                    </p>
                  </div>
                ) : result.type === "audio" ? (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-vibrant-purple">
                      Audio Analysis
                    </h3>
                    <p className="text-lg">
                      <strong>Audio File Name:</strong>{" "}
                      {result.input || "Unknown"}
                    </p>
                    <p className="text-lg">
                      <strong>Sentiment:</strong> {result.emotion || "Unknown"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-vibrant-purple">
                      {result.type
                        ? result.type.charAt(0).toUpperCase() +
                          result.type.slice(1)
                        : "Analysis"}
                    </h3>
                    <p className="text-lg">
                      <strong>Input:</strong> {result.input || "N/A"}
                    </p>
                    <p className="text-lg">
                      <strong>Sentiment:</strong> Positive:{" "}
                      {(result.sentiment?.positive || 0).toFixed(2)}, Negative:{" "}
                      {(result.sentiment?.negative || 0).toFixed(2)}, Neutral:{" "}
                      {(result.sentiment?.neutral || 0).toFixed(2)}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">No analysis results yet.</p>
      )}
    </motion.section>
  );
}

export default ResultsDisplay;
