import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const API_URL = "http://15.207.167.232:5000";

const TrendAnalytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/analytics/trend`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const labels = data.map(item => item._id);
  const values = data.map(item => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Daily Complaints",
        data: values,
        borderColor: "#007bff",
        fill: false
      }
    ]
  };

  return (
    <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
      <h2>📈 Complaint Trend Analysis</h2>

      <Line data={chartData} />
    </div>
  );
};

export default TrendAnalytics;
