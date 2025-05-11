import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap", //  allow wrapping on small screens for responsive
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "40px 75px", // reduced padding for better small screen spacing for responsive
        background: "linear-gradient(to right, #1A0B56, #1C0F70)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        minHeight: "300px",
        boxSizing: "border-box",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        position: "relative",
        zIndex: 1,
        rowGap: "30px", //  spacing between rows when wrapped for responsive
      }}
    >
     
      <div style={{ flex: "1 1 250px", maxWidth: "300px" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#3498db" }}>⚪</span> Satyamstudio
        </h2>
        <p>
          OurStudio is a digital agency specializing in UI/UX design and website
          development, located in Ohio, USA.
        </p>
      </div>

      
      <div style={{ flex: "1 1 200px" }}>
        <h3 style={{ color: "#3498db" }}>Get in Touch</h3>
        <p>📍 8819 Ohio St. South Gate, CA 90280</p>
        <p>📧 Ourstudio@hello.com</p>
        <p>📞 +1 386-688-3295</p>
      </div>

     
      <div style={{ flex: "1 1 200px" }}>
        <h3 style={{ color: "#3498db" }}>Service</h3>
        <p>Illustration</p>
        <p>Mobile Design</p>
        <p>Motion Graphic</p>
        <p>Web Design</p>
        <p>Development</p>
        <p>SEO</p>
      </div>

     
      <div style={{ flex: "1 1 200px" }}>
        <h3 style={{ color: "#3498db" }}>Company</h3>
        <p>Service</p>
        <p>Features</p>
        <p>Our Team</p>
        <p>Portfolio</p>
        <p>Blog</p>
        <p>Contact Us</p>
      </div>

      <div style={{ flex: "1 1 250px", maxWidth: "300px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          {["Dr", "Dr", "Be"].map((icon, i) => (
            <div
              key={i}
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
              {icon}
            </div>
          ))}
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
