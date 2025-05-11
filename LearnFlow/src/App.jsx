import React, { useState } from "react";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";

import ReactFlow, { MiniMap, Controls, Background, ReactFlowProvider, useReactFlow, useNodesState, useEdgesState } from "reactflow";

import "reactflow/dist/style.css";
import FeatureSection2 from "./Pages/FeatureSection2";
import Home from "./Pages/Home";
import FeatureSection from "./Pages/FeatureSection";
import Footer from "./Pages/Footer";

import Login from "./Pages/Login";
import SignUp from "./Pages/signup";

import LayoutFlow from "./components/LayoutFlow";


import { initialNodes, initialEdges } from './components/nodes-edges';
import '@xyflow/react/dist/style.css';



const App = () => {
  return (
<Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
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
          }
        />
        {/* Optionally redirect "/" to "/login" */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
