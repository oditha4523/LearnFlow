import React from "react";

const Card = ({ icon, title, description }) => {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
    </div>
  );
};

const CardContainer = () => {
  return (
    <div style={styles.container}>
      <Card 
        icon={<span style={styles.aiIcon}>AI</span>} 
        title="Generative AI" 
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
      />
      <Card 
        icon={<span>&#128230;</span>} 
        title="Dynamic Flowcharts" 
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
      />
      <Card 
        icon={<span>&#128221;</span>} 
        title="Self Learning" 
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
      />
      
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    /* background: "linear-gradient(to bottom, #2E1A86, #3E1E92)", */
    padding: "50px",
    top: 0,
    left: 0,
  },
  card: {
    background: "white",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    /* boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", */
    flex: "1",
    maxWidth: "300px",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  aiIcon: {
    display: "inline-block",
    padding: "5px 10px",
    border: "2px solid black",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  description: {
    color: "#777",
  },
};

export default CardContainer;
