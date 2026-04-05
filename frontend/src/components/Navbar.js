import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Smart Waste Management</h2>

      <div style={styles.links}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/complaint">Register Complaint</Link>
        <Link style={styles.link} to="/dashboard">Dashboard</Link>
        <Link style={styles.link} to="/map">Live Map</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#2c3e50",
    padding: "15px 30px",
    color: "white"
  },

  logo: {
    margin: 0
  },

  links: {
    display: "flex",
    gap: "20px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px"
  }
};

export default Navbar;
