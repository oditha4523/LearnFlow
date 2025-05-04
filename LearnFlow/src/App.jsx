import React, { useState } from "react";
import axios from "axios";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import FeatureSection2 from "./Pages/FeatureSection2";
import Home from "./Pages/Home";
import FeatureSection from "./Pages/FeatureSection";
import Footer from "./Pages/Footer";
import Login from "./Pages/Login";
import SignUp from "./Pages/signup";

const RoadmapGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateRoadmap = async () => {
    if (!keyword) {
      setError("Please enter a keyword.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/generate_roadmap",
        { keyword }
      );

      console.log("API Response:", response.data);
      const { nodes = [], edges = [] } = response.data || {};

      const formattedNodes = nodes?.map((node) => ({
        id: node.id.toString(),
        position: { x: Math.random() * 250, y: Math.random() * 100 },
        data: {
          label: node.title,
        },
      }));

      const formattedEdges = edges?.map((edge, index) => ({
        id: `edge-${index + 1}`,
        source: edge.source.toString(),
        target: edge.target.toString(),
      }));

      setNodes(formattedNodes);
      setEdges(formattedEdges);
    } catch (error) {
      setError("Failed to generate roadmap. Please try again.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", padding: "20px" }}>
      <h1>Programming Roadmap Generator</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a keyword (e.g., React)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleGenerateRoadmap} disabled={loading}>
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ width: "100%", height: "80vh", border: "1px solid #ccc" }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

const App = () => {
  const [showRoadmapGenerator, setShowRoadmapGenerator] = useState(false);

  return (
    <div>
      {!showRoadmapGenerator ? (
        <>
          <Login />
          <SignUp />
          <Home onGetStarted={() => setShowRoadmapGenerator(true)} />
          <FeatureSection />
          <FeatureSection2 />
        </>
      ) : (
        <RoadmapGenerator />
      )}
      {/* Footer is always displayed at the bottom */}
      <Footer />
    </div>
  );
};

export default App;
