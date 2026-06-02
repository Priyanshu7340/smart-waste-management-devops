import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API_URL = "http://15.207.167.232:5000";

const Heatmap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/complaints`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📍 Waste Complaint Map</h2>

      <MapContainer
        center={[30.3165, 78.0322]}
        zoom={12}
        style={{ height: "500px", width: "90%", margin: "auto" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((c, index) => {
          if (!c.latitude || !c.longitude) return null;

          return (
            <CircleMarker
              key={index}
              center={[c.latitude, c.longitude]}
              radius={8}
              pathOptions={{ color: "red" }}
            >
              <Popup>
                <b>{c.type}</b><br />
                {c.location}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Heatmap;
