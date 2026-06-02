import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TypeAnalytics.css";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const API_URL = "http://15.207.167.232:5000";

const TypeAnalytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/analytics/type-wise`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const labels = data.map(item => item._id || "Unknown");
  const values = data.map(item => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Complaints",
        data: values,
        backgroundColor: [
          "#007bff",
          "#28a745",
          "#ffc107",
          "#dc3545",
          "#6f42c1",
          "#17a2b8",
          "#ff5733",
          "#33ff57"
        ]
      }
    ]
  };

  return (
    <div className="type-container">
      <div className="type-box">

        {/* LEFT - TABLE */}
        <div className="table-section">
          <h2>♻️ Complaint Types</h2>

          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Count</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item._id || "Unknown"}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT - CHARTS */}
        <div className="chart-section">
          <h2>📊 Visualization</h2>

          <h4>Bar Chart</h4>
          <Bar data={chartData} />

          <h4 style={{ marginTop: "30px" }}>Pie Chart</h4>
          <Pie data={chartData} />
        </div>

      </div>
    </div>
  );
};

export default TypeAnalytics;
