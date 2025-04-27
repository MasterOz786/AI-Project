import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TextAnalysis from "./components/TextAnalysis";
import AudioAnalysis from "./components/AudioAnalysis";
import VideoAnalysis from "./components/VideoAnalysis";
import ResultsDisplay from "./components/ResultsDisplay";

function App() {
  const [text, setText] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Replace with your actual API endpoints
  const TEXT_API_URL = "https://your-text-api-endpoint";
  const AUDIO_API_URL = "https://your-audio-api-endpoint";
  const VIDEO_API_URL = "https://your-video-api-endpoint";

  // Fetch history from backend
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/history");
        setResults(response.data);
      } catch (err) {
        setError("Failed to fetch history");
      }
    };
    fetchHistory();
  }, []);

  const handleTextAnalysis = async () => {
    if (!text) {
      setError("Please enter text");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(TEXT_API_URL, { text });
      const result = { type: "text", input: text, ...response.data };
      await axios.post("http://localhost:5000/api/analyze", result);
      setResults([...results, result]);
      setText("");
    } catch (err) {
      setError("Text analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAudioAnalysis = async () => {
    if (!audioFile) {
      setError("Please select an audio file");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("audio", audioFile);
      const response = await axios.post(AUDIO_API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const result = { type: "audio", input: audioFile.name, ...response.data };
      await axios.post("http://localhost:5000/api/analyze", result);
      setResults([...results, result]);
      setAudioFile(null);
    } catch (err) {
      setError("Audio analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoAnalysis = async () => {
    if (!videoFile) {
      setError("Please select a video file");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      const response = await axios.post(VIDEO_API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const result = { type: "video", input: videoFile.name, ...response.data };
      await axios.post("http://localhost:5000/api/analyze", result);
      setResults([...results, result]);
      setVideoFile(null);
    } catch (err) {
      setError("Video analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TextAnalysis
        text={text}
        setText={setText}
        handleAnalysis={handleTextAnalysis}
        loading={loading}
        error={error}
      />
      <AudioAnalysis
        setAudioFile={setAudioFile}
        handleAnalysis={handleAudioAnalysis}
        loading={loading}
        error={error}
      />
      <VideoAnalysis
        setVideoFile={setVideoFile}
        handleAnalysis={handleVideoAnalysis}
        loading={loading}
        error={error}
      />
      <ResultsDisplay results={results} />
    </div>
  );
}

export default App;
