import React from "react";
import robotImage from "../assets/bgg111.png";

const FeatureSection2 = () => {
  return (
    <div style={styles.container}>
      <img src={robotImage} alt="Robot" style={styles.robotImage} />
      <div style={styles.textContainer}>
        <h1 style={styles.heading}>Giving Your Awesome <br /> Business Fresh Start With US</h1>
        <p style={styles.subtext}>Giving Your Awesome Business Fresh Start With US</p>
        <p style={styles.subtext}>Giving Your Awesome Business Fresh Start With US</p>
        <div style={styles.boxContainer}>
          <div style={styles.box}>
            <div style={styles.square}></div>
            <p style={styles.boxTitle}>NEW DESIGN</p>
            <p style={styles.boxDescription}>Giving Your Awesome ddddd Business Fresh Start</p>
          </div>
          <div style={styles.box}>
            <div style={styles.square}></div>
            <p style={styles.boxTitle}>NEW DESIGN</p>
            <p style={styles.boxDescription}>Giving Your Awesome Business Fresh Start With US</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "60px 10%",
    flexWrap: "wrap", //  Added for wrapping on smaller screens (for responsive)
  },
  textContainer: {
    flex: 1,
    textAlign: "left",
    minWidth: "300px", // Ensures proper wrapping (for responsive)
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
    flexWrap: "wrap", // Added for mobile wrapping (for responsive)
  },
  box: {
    textAlign: "left",
    flex: "1 1 200px", // Responsive box sizing (for responsive)
    minWidth: "200px",
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
    width: "100%",
    maxWidth: "445px", // Limit image width (for responsive)
    height: "auto",
    marginRight: "50px",
    animation: "float 3s ease-in-out infinite",
    flex: "1 1 300px", // Responsive image sizing (for responsive)
    marginBottom: "40px", //  Space below image on wrap (for responsive)
  },
};

export default FeatureSection2;
