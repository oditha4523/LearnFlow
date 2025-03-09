import React, { useState } from "react";
import axios from "axios";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

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
      // Check if nodes and edges are included in the response
      const { nodes, edges } = response.data;
  
      if (!nodes || !edges) {
        setError("Missing nodes or edges in the data.");
        return;
      }
  
      // Format nodes for React Flow
      const formattedNodes = nodes.map((node) => ({
        id: node.id.toString(),  // Ensure the ID is a string for React Flow
        position: { x: Math.random() * 250, y: Math.random() * 100 },  // Basic auto-layout
        data: {
          label: node.title,
          description: node.description,
        },
      }));
  
      // Format edges for React Flow
      const formattedEdges = edges.map((edge, index) => ({
        id: `edge-${index + 1}`,  // Unique ID for each edge
        source: edge.source.toString(),  // Ensure source is a string
        target: edge.target.toString(),  // Ensure target is a string
        animated: true,  // Optional: Makes the edges animated
      }));
  
      // Set nodes and edges in state
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

export default RoadmapGenerator;
