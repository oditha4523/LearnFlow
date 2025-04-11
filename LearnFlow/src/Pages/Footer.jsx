import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "40px 80px",
        background: "linear-gradient(to right, #1A0B56, #1C0F70)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        minHeight: "300px",
        boxSizing: "border-box",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        position: "relative", // Changed from fixed to relative
        zIndex: 1, // Ensures it stays above background elements
      }}
    >
      {/* Left Section */}
      <div style={{ maxWidth: "250px" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#3498db" }}>⚪</span> Satyamstudio
        </h2>
        <p>
          OurStudio is a digital agency specializing in UI/UX design and website
          development, located in Ohio, USA.
        </p>
      </div>

      {/* Contact Section */}
      <div>
        <h3 style={{ color: "#3498db" }}>Get in Touch</h3>
        <p>📍 8819 Ohio St. South Gate, CA 90280</p>
        <p>📧 Ourstudio@hello.com</p>
        <p>📞 +1 386-688-3295</p>
      </div>

      {/* Service Section */}
      <div>
        <h3 style={{ color: "#3498db" }}>Service</h3>
        <p>Illustration</p>
        <p>Mobile Design</p>
        <p>Motion Graphic</p>
        <p>Web Design</p>
        <p>Development</p>
        <p>SEO</p>
      </div>

      {/* Company Section */}
      <div>
        <h3 style={{ color: "#3498db" }}>Company</h3>
        <p>Service</p>
        <p>Features</p>
        <p>Our Team</p>
        <p>Portfolio</p>
        <p>Blog</p>
        <p>Contact Us</p>
      </div>

      {/* Social Section */}
      <div style={{ maxWidth: "200px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#3498db",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Dr
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#3498db",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Dr
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#3498db",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Be
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </p>
      </div>
    </div>
  );
};

export default Footer;