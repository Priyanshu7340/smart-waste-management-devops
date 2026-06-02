import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Complaint from "./pages/ComplaintForm";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import RoleSelect from "./pages/RoleSelect";
import TrackStatus from "./pages/TrackStatus";
import Analytics from "./pages/Analytics";
import TypeAnalytics from "./pages/TypeAnalytics";
import TrendAnalytics from "./pages/TrendAnalytics";
import Heatmap from "./pages/Heatmap";

/* 🔐 PROTECTED ROUTE */
const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // अगर login नहीं है
  if (!token) return <Navigate to="/" />;

  // अगर admin route है
  if (roleRequired && role !== roleRequired) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/heatmap" element={<Heatmap />} />

        {/* Trend Analytics Daashboard */}
        <Route path="/trend" element={<TrendAnalytics />} />

        {/* Type Analytics Daashboard */}
        <Route path="/type-analytics" element={<TypeAnalytics />} />

        {/* Analytics dashboard */}
        <Route path="/analytics" element={<Analytics />} />

        {/*  Track status  (FIRST PAGE) */}
        <Route path="/track" element={<TrackStatus />} /> 

        {/* ROLE SELECT (FIRST PAGE) */}
        <Route path="/" element={<RoleSelect />} />

        {/* ADMIN LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* USER (NO LOGIN REQUIRED FOR NOW) */}
        <Route path="/complaint" element={<Complaint />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roleRequired="admin">
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* HISTORY (ADMIN / USER TOKEN BASED) */}
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
