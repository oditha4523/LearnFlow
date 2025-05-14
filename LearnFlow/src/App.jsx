import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import FeatureSection2 from "./Pages/FeatureSection2";
import Home from "./Pages/Home";
import FeatureSection from "./Pages/FeatureSection";
import Footer from "./Pages/Footer";
import Login from "./Pages/Login";
import SignUp from "./Pages/signup";
import LayoutFlow from "./components/LayoutFlow";
import "@xyflow/react/dist/style.css";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>

      {!showRoadmapGenerator ? (
        <>
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
