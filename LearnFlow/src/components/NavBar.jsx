import React from "react";

const Navbar = () => (
  <nav
    style={{
      width: "100vw",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 10,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 5vw",
      boxSizing: "border-box",
      backdropFilter: "blur(4px)",
    }}
  >
    <div
      style={{
        fontWeight: "bold",
        fontSize: "1.5rem",
        color: "white",
        letterSpacing: "2px",
      }}
    >
      LearnFlow
    </div>
    
    <div>
      <a href="#home" style={navLinkStyle}>Home</a>
      <a href="#services" style={navLinkStyle}>Services</a>
      <a href="#about" style={navLinkStyle}>About</a>
      <a href="#contact" style={navLinkStyle}>Contact</a>
    </div>

  </nav>
);

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  margin: "0 1rem",
  fontWeight: "500",
  fontSize: "1rem",
  transition: "color 0.2s",
};

export default Navbar;
