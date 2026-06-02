import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Analytics.css";

const API_URL = "http://15.207.167.232:5000";

const Analytics = () => {
  const [avgTime, setAvgTime] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/analytics/avg-time`)
      .then(res => setAvgTime(res.data.avgTime))
      .catch(err => console.log(err));
  }, []);

  const hours = parseFloat(avgTime);
  const days = Math.floor(hours / 24);
  const remainingHours = (hours % 24).toFixed(2);

  return (
    <div className="analytics-container">
      <div className="analytics-box">
        <h2 className="analytics-title">📊 System Analytics</h2>

        <p className="analytics-subtitle">
          Average Resolution Time
        </p>

        <p className="analytics-value">
          {days} Days {remainingHours} Hours
        </p>
      </div>
    </div>
  );
};

export default Analytics;
