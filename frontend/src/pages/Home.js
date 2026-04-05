import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const styles = {

    container: {
      height: "100vh",
      backgroundImage: "url('https://i.ibb.co/PZF9j64M/waste-bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },

    card: {
      backgroundColor: "rgba(0,0,0,0.6)",
      padding: "50px",
      borderRadius: "15px",
      textAlign: "center",
      color: "white",
      maxWidth: "600px"
    },

    title: {
      fontSize: "42px",
      fontWeight: "bold",
      marginBottom: "15px"
    },

    subtitle: {
      fontSize: "18px",
      marginBottom: "30px"
    },

    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px"
    },

    button: {
      padding: "12px 20px",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      color: "white"
    },

    registerBtn: {
      backgroundColor: "#28a745"
    },

    dashboardBtn: {
      backgroundColor: "#34495e"
    },

    mapBtn: {
      backgroundColor: "#f39c12"
    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Smart Waste Management System
        </h1>

        <p style={styles.subtitle}>
          Help keep your city clean. Report waste problems quickly and track them in real time.
        </p>

        <div style={styles.buttonContainer}>

          <button
            style={{ ...styles.button, ...styles.registerBtn }}
            onClick={() => navigate("/complaint")}
          >
            Register Complaint
          </button>

          <button
            style={{ ...styles.button, ...styles.dashboardBtn }}
            onClick={() => navigate("/dashboard")}
          >
            Admin Dashboard
          </button>

          <button
            style={{ ...styles.button, ...styles.mapBtn }}
            onClick={() => navigate("/map")}
          >
            Live Complaint Map
          </button>

        </div>

      </div>

    </div>

  );

};

export default Home;
