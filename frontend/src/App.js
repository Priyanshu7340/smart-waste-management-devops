import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Complaint from "./pages/ComplaintForm";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

/* 🔐 PROTECTED ROUTE */
const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;
  if (roleRequired && role !== roleRequired) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* USER */}
        <Route
          path="/complaint"
          element={
            <PrivateRoute>
              <Complaint />
            </PrivateRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roleRequired="admin">
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* HISTORY */}
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
