import React, { useState, useEffect } from "react";
import axios from "axios";
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
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post(`${API_URL}/complaints`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ POPUP FIX
      alert("✅ Complaint submitted successfully!");

      // reset
      setName("");
      setLocation("");
      setType("");
      setDescription("");
      setImage(null);

    } catch (error) {
      console.error(error);
      alert("❌ Error submitting complaint");
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
          </select>

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
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
