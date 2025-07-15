
import React from 'react';
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/signup.jsx";
import HomePage from './Pages/HomePage.jsx';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (

    <ReactFlowProvider>
      <main className="relative min-h-screen overflow-x-hidden">
        <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
        <div className="overflow-hidden">
          <Navbar />
          <Hero />
          <CompanyLogo />
          {/* <PurposeSection /> */}
          <FeaturesSection onBecomePartner={handleBecomePartner} />
          {showLayoutFlow && (
            <div className="flow-container" style={{ margin: '2rem auto' }}>
              <LayoutFlow />
            </div>
          )}
          
          <ScheduleSection />
          <MonitorSection />
          {/* <PricingSection /> */}
          <ServicesSection />
          <TestimonialsSection />
          {/* <NewsletterSection /> */}
          <Footer />
        </div>
      </main>
    </ReactFlowProvider>

  );
}

export default App;
