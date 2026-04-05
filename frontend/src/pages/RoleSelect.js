import React from "react";

const RoleSelect = () => {

  const selectRole = (role) => {
    localStorage.setItem("role", role);
    window.location.href = "/login";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Who are you?</h2>

      <button onClick={() => selectRole("user")} style={{ margin: "10px" }}>
        User / Complaint
      </button>

      <button onClick={() => selectRole("admin")} style={{ margin: "10px" }}>
        Admin
      </button>
    </div>
  );
};

export default RoleSelect;
