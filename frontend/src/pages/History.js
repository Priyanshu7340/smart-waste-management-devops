import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://15.207.167.232:5000";

const History = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/complaints`).then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Complaints</h2>

      {data.map((c) => (
        <div key={c.id} style={{ margin: "10px", border: "1px solid #ddd", padding: "10px" }}>
          <p><b>{c.location}</b> - {c.status}</p>
        </div>
      ))}
    </div>
  );
};

export default History;
