import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const API_URL = "http://15.207.167.232:5000";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapDashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/complaints`).then((res) => {
      setComplaints(res.data);
    });
  }, []);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <h2 style={{ textAlign: "center" }}>Live Complaint Map</h2>

      <MapContainer
        center={[30.4067, 77.9690]}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {complaints.map((c) =>
          c.latitude && c.longitude ? (
            <Marker
              key={c.id}
              position={[parseFloat(c.latitude), parseFloat(c.longitude)]}
            >
              <Popup>
                <b>{c.type}</b>
                <br />
                {c.location}
                <br />
                Status: {c.status}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
};

export default MapDashboard;
