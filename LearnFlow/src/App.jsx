import React, { useState } from "react";
import axios from "axios";
import ReactFlow, { MiniMap, Controls, Background, ReactFlowProvider, useReactFlow, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import FeatureSection2 from './Pages/FeatureSection2';
import Home from './Pages/Home';
import FeatureSection from "./Pages/FeatureSection";
import Footer from "./Pages/Footer";
import LayoutFlow from "./components/LayoutFlow";

import { initialNodes, initialEdges } from './components/nodes-edges';
import '@xyflow/react/dist/style.css';



const App = () => {
  return (
    <div className="app-container">
      <Home />
      <FeatureSection />
      <FeatureSection2 />
      <div className="flow-container" style={{ margin: '2rem auto' }}>
        <ReactFlowProvider>
          <LayoutFlow />
        </ReactFlowProvider>
      </div>
      <Footer />
    </div>
  );
};

export default App;