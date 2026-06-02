import React, { useState, useEffect } from "react";
import "./ComplaintForm.css";

const API_URL = "http://15.207.167.232:5000";

const ComplaintForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [complaintId, setComplaintId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/";
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    try {
      const res = await fetch(`${API_URL}/complaints`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // ✅ Show ID
      setComplaintId(data.id);

      // ✅ Reset form
      setName("");
      setLocation("");
      setType("");
      setDescription("");
      setImage(null);

    } catch (err) {
      alert("Error submitting complaint");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Register Waste Complaint</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Overflowing Bin">Overflowing Bin</option>
          <option value="Garbage Dump">Garbage Dump</option>
          <option value="Street Garbage">Street Garbage</option>
          <option value="Drain Blockage">Drain Blockage</option>
          <option value="Sewage Issue">Sewage Issue</option>
          <option value="Dead Animal">Dead Animal</option>
          <option value="Construction Waste">Construction Waste</option>
          <option value="Plastic Waste">Plastic Waste</option>
          <option value="Other">Other</option>
          </select>
         
          {type === "Other" && (
            <input
              type="text"
              placeholder="Enter custom type"
              onChange={(e) => setType(e.target.value)}
            />
          )}


          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="gps-box">
            <p><b>Latitude:</b> {latitude}</p>
            <p><b>Longitude:</b> {longitude}</p>
          </div>

          <button type="submit">Submit Complaint</button>

          {/* 🔥 SHOW ID */}
          {complaintId && (
            <p style={{ marginTop: "10px" }}>
              Your Complaint ID: <b>{complaintId}</b>
            </p>
          )}

          <br /><br />

          <button
            type="button"
            onClick={() => window.location.href = "/track"}
            style={{
              background: "#007bff",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Track Complaint
          </button>

        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
