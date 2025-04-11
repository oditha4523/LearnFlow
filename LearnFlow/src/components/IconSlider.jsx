import React from "react";

const IconSlider = () => {
  const icons = ["🚀", "💡", "📚", "🎨", "⚙️", "🌐", "📈"]; // Example icons

  return (
    <div style={styles.sliderContainer}>
      <div style={styles.sliderContent}>
        {icons.map((icon, index) => (
          <div key={index} style={styles.icon}>
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  sliderContainer: {
    overflow: "hidden", // Ensures the animation stays within bounds
    width: "100%",
    background: "white",
    borderRadius: "10px",
    margin: "20px 0",
    padding: "20px 0",
  },
  sliderContent: {
    display: "flex",
    gap: "200px",
    animation: "scroll 10s linear infinite", // Animation for continuous scrolling
  },
  icon: {
    fontSize: "30px",
    color: "white",
    background: "#3498db",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
};

// Add keyframes for the animation
const styleSheet = document.styleSheets[0];
const keyframes = `
  @keyframes scroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default IconSlider;