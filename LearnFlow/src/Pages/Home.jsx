import React from 'react';
import image from '../assets/bgggg.png';
import CardContainer from '../components/CardContainer';

const Home = ({ onGetStarted }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        position: "relative", // Changed from fixed to relative
        zIndex: 0,
      }}
    >
      <div style={{ color: "white", textAlign: "left", paddingTop: "15%", paddingLeft: "10%" }}>
        <h1 className='text-container' style={{ fontSize: "3rem", fontWeight: "bold" }}>
          Start Your Learning Path
          <br />
          With Our Services kjdshkfjhsdf
        </h1>
        <p style={{ fontSize: "1.2rem", margin: "20px 0" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
          Sed do eiusmod tempor incididunt ut labore et dolore.
        </p>
        <button
          onClick={onGetStarted}
          style={{
            background: "linear-gradient(90deg, #5B57FF, #4382FF)",
            border: "none",
            padding: "12px 24px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            margin: "20px 0",
          }}
        >
          GET STARTED
        </button>
      </div>
      <CardContainer />
    </div>
  );
};

export default Home;