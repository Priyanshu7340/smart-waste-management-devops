import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const API_URL = "http://15.207.167.232:5000";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${API_URL}/complaints`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/complaints/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Deleted successfully");
      fetchComplaints();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // STATUS CHANGE
  const handleStatusChange = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");

      const newStatus =
        currentStatus === "Pending" ? "Resolved" : "Pending";

      await axios.put(
        `${API_URL}/complaints/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComplaints();
    } catch (err) {
      alert("Status update failed");
    }
  };

  // FILTER
  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </li>

          <li
            className={filter === "Pending" ? "active" : ""}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </li>

          <li
            className={filter === "Resolved" ? "active" : ""}
            onClick={() => setFilter("Resolved")}
          >
            Resolved
          </li>

          <li
            className="logout"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="main-content">
        <h2>Admin Dashboard</h2>

        {/* CARDS */}
        <div className="dashboard-cards">
          <div className="card total">Total <br /> {total}</div>
          <div className="card pending">Pending <br /> {pending}</div>
          <div className="card resolved">Resolved <br /> {resolved}</div>
        </div>

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th> {/* ✅ ADDED */}
              <th>Status</th>
              <th>Image</th>
              <th>Map</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.map((c) => (
              <tr key={c._id}>
                <td>{c._id}</td>
                <td>{c.name}</td>
                <td>{c.location}</td>

                {/* ✅ DESCRIPTION */}
                <td>{c.description}</td>

                {/* STATUS */}
                <td>
                  <span className={c.status === "Pending" ? "badge red" : "badge green"}>
                    {c.status}
                  </span>

                  <br />

                  <button
                    className="resolve-btn"
                    onClick={() =>
                      handleStatusChange(c._id, c.status)
                    }
                  >
                    Resolve
                  </button>
                </td>

                {/* IMAGE */}
                <td>
                  {c.image ? (
                    c.image.endsWith(".mp4") ? (
                      <video width="100" controls>
                        <source src={`${API_URL}/uploads/${c.image}`} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={`${API_URL}/uploads/${c.image}`}
                        alt="img"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80";
                        }}
                      />
                    )
                  ) : (
                    "No Image"
                  )}
                </td>

                {/* MAP */}
                <td>
                  <iframe
                    src={`https://maps.google.com/maps?q=${c.latitude},${c.longitude}&z=15&output=embed`}
                    title="map"
                  ></iframe>
                </td>

                <td>{new Date(c.time).toLocaleString()}</td>

                {/* DELETE */}
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Dashboard;
