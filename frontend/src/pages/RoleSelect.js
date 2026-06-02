import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelect.css";

const RoleSelect = () => {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("role", role);

    if (role === "user") {
      navigate("/complaint");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="role-container">
      <div className="role-box">
        <h2>Smart Waste Management</h2>
        <p>Select your role</p>

        <button onClick={() => selectRole("user")}>
          User / Complaint
        </button>

        <button onClick={() => selectRole("admin")}>
          Admin
        </button>
      </div>
    </div>
  );
};

export default RoleSelect;
