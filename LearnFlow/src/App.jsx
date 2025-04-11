<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
=======
import React, { useState } from "react";
import axios from "axios";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import FeatureSection2 from './Pages/FeatureSection2';
import Home from './Pages/Home';
import FeatureSection from "./Pages/FeatureSection";
import Footer from "./Pages/Footer";
import IconSlider from "./components/IconSlider";

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
>>>>>>> Stashed changes

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

<<<<<<< Updated upstream
export default App
=======
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
          <Home onGetStarted={() => setShowRoadmapGenerator(true)} />
          <IconSlider/>
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
>>>>>>> Stashed changes
