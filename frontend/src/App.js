import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TextAnalysis from "./components/TextAnalysis";
import AudioAnalysis from "./components/AudioAnalysis";
import ResultsDisplay from "./components/ResultsDisplay";
import YouTubeAnalysis from "./components/YouTubeAnalysis";

function App() {
  const [text, setText] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Replace with your actual API endpoints
  const TEXT_API_URL = "https://your-text-api-endpoint";
  const AUDIO_API_URL = "https://your-audio-api-endpoint";

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

  return (
    <Router>
      <div className="min-h-screen bg-deep-purple">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
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
                <ResultsDisplay results={results} />
              </>
            }
          />
          <Route
            path="/youtube-analysis"
            element={
              <YouTubeAnalysis
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
