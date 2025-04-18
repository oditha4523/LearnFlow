import React from "react";
import robotImage from "../assets/bggg.png";

const FeatureSection = () => {
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.heading}>
          Giving Your Awesome <br />
          hello Business Fresh Start With US
        </h1>
        <p style={styles.subtext}>
          Giving Your Awesome Business Fresh Start With US
        </p>
        <p style={styles.subtext}>
          Giving Your Awesome Business Fresh Start With US
        </p>
        <div style={styles.boxContainer}>
          <div style={styles.box}>
            <div style={styles.square}></div>
            <p style={styles.boxTitle}>NEW DESIGN</p>
            <p style={styles.boxDescription}>
              Giving Your Awesome ddddd Business Fresh Start
            </p>
          </div>
          <div style={styles.box}>
            <div style={styles.square}></div>
            <p style={styles.boxTitle}>NEW DESIGN</p>
            <p style={styles.boxDescription}>
              Giving Your Awesome Business Fresh Start With US
            </p>
          </div>
        </div>
      </div>
      <img src={robotImage} alt="Robot" style={styles.robotImage} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "60px 10%",
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: "3.5rem",
    fontWeight: "bold",
    marginBottom: "60px",
  },
  subtext: {
    fontSize: "1.2rem",
    color: "#888",
    marginBottom: "30px",
  },
  boxContainer: {
    display: "flex",
    gap: "50px",
    marginTop: "60px",
  },
  box: {
    textAlign: "left",
  },
  square: {
    width: "60px",
    height: "60px",
    background: "linear-gradient(to bottom, #3E1E92, #6C2DC7)",
    borderRadius: "10px",
    margin: "0 0 10px",
  },
  boxTitle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  boxDescription: {
    color: "#888",
    fontSize: "0.9rem",
  },
  robotImage: {
    width: "445px",
    height: "auto",
    animation: "anim 3s ease-in-out infinite",
  },
};

export default FeatureSection;
