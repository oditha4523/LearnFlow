import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CompanyLogo from './components/CompanyLogo';
import PurposeSection from './components/PurposeSection';
import FeaturesSection from './components/FeaturesSection';
import ScheduleSection from './components/ScheduleSection';
import MonitorSection from './components/MonitorSection';
import PricingSection from './components/PricingSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import { ReactFlowProvider } from 'reactflow';
import LayoutFlow from './components/LayoutFlow';


function App() {
  const [showLayoutFlow, setShowLayoutFlow] = useState(false);

  const handleBecomePartner = () => {
    setShowLayoutFlow(true);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <Hero />
        <CompanyLogo />
        <PurposeSection />
        <FeaturesSection onBecomePartner={handleBecomePartner} />
        <ScheduleSection />
        <MonitorSection />
        {/* <PricingSection /> */}
        <ServicesSection />
        <TestimonialsSection />
        {/* <NewsletterSection /> */}
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

export default App;