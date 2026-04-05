import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const API = "http://15.207.167.232:5000";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/login`, {
        phone,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/complaint";
      }

    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay">
        <div className="login-box">
          
          <h2>Admin Login</h2>
          <p>Smart Waste Management System</p>

          <input
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

        </div>
      </div>
    </div>
  );
};

export default Login;
