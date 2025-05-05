import React, { useState } from "react";
import axios from "axios";
import ReactFlow, { MiniMap, Controls, Background, ReactFlowProvider, useReactFlow, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import FeatureSection2 from './Pages/FeatureSection2';
import Home from './Pages/Home';
import FeatureSection from "./Pages/FeatureSection";
import Footer from "./Pages/Footer";

import { initialNodes, initialEdges } from './components/nodes-edges';
import '@xyflow/react/dist/style.css';

const getLayoutedElements = (nodes, edges) => {
  return { nodes, edges };
};

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const fetchRoadmap = async (keyword) => {
    try {
      const response = await fetch('http://localhost:5000/generate_roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      const result = await response.json();

      const nodesMatch = result.match(/nodes\s*=\s*(\[[\s\S]*?\]);/);
      const edgesMatch = result.match(/edges\s*=\s*(\[[\s\S]*?\]);/);

      if (nodesMatch && edgesMatch) {
        const newNodes = eval(nodesMatch[1]);
        const newEdges = eval(edgesMatch[1]);
        setNodes(newNodes);
        setEdges(newEdges);
        fitView();
      } else {
        console.error('Invalid response format:', result);
      }
    } catch (error) {
      console.error('Error fetching roadmap:', error);
    }
  };

  return (
    <div style={{ width: '70%', height: '50vh', alignItems: 'center', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      />
    </div>
  );
};

const App = () => {
  const [showFlow, setShowFlow] = useState(false);

  const handleGetStarted = () => {
    setShowFlow(true);
  };

  return (
    <div>
      {!showFlow ? (
        <>
          <Home onGetStarted={handleGetStarted} />
          <FeatureSection />
          <FeatureSection2 />
          <Footer />
        </>
      ) : (
        <ReactFlowProvider>
          <LayoutFlow />
        </ReactFlowProvider>
      )}
    </div>
  );
};

export default App;