import React, { useState } from "react";
import axios from "axios";
import "./TrackStatus.css";

const API_URL = "http://15.207.167.232:5000";

const TrackStatus = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API_URL}/complaints/${id}`);
      setData(res.data);
    } catch (err) {
      alert("Complaint not found");
    }
  };

  return (
    <div className="track-container">
      <div className="track-box">
        <h2>Track Complaint</h2>

        <input
          type="text"
          placeholder="Enter Complaint ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>

        {data && (
          <div className="result-box">
            <p><b>Name:</b> {data.name}</p>
            <p><b>Location:</b> {data.location}</p>
            <p><b>Status:</b> {data.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackStatus;
