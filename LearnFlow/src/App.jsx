import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Hero from './components/Hero';
import CompanyLogo from './components/CompanyLogo';
import PurposeSection from './components/PurposeSection';
import FeaturesSection from './components/FeaturesSection';
import ScheduleSection from './components/ScheduleSection';
import MonitorSection from './components/MonitorSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import { ReactFlowProvider } from 'reactflow';
import LayoutFlow from './components/LayoutFlow';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function MainPage({ handleBecomePartner, showLayoutFlow }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <NavBar />
        <Hero />
        <CompanyLogo />
        <PurposeSection />
        <FeaturesSection onBecomePartner={handleBecomePartner} />
        <ScheduleSection />
        <MonitorSection />
        <ServicesSection />
        <TestimonialsSection />
        {showLayoutFlow && (
          <div className="flow-container" style={{ margin: '2rem auto' }}>
            <ReactFlowProvider>
              <LayoutFlow />
            </ReactFlowProvider>
          </div>
        )}
        <Footer />
      </div>
    </main>
  );
}

function App() {
  const [showLayoutFlow, setShowLayoutFlow] = useState(false);

  const handleBecomePartner = () => {
    setShowLayoutFlow(true);
  };

  return (
    
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              handleBecomePartner={handleBecomePartner}
              showLayoutFlow={showLayoutFlow}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    
  );
}

export default App;