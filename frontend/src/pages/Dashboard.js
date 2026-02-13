import React, { useState, useEffect } from "react";

const Dashboard = () => {

  // Dummy complaints data (for now)
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const dummyData = [
      { id: 1, name: "Utsav", location: "Dehradun", status: "Pending" },
      { id: 2, name: "Rahul", location: "Delhi", status: "Resolved" },
      { id: 3, name: "Aman", location: "Mumbai", status: "Pending" }
    ];

    setComplaints(dummyData);
  }, []);

  // Calculate totals
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Complaints</h3>
          <p>{total}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>

        <div className="card">
          <h3>Resolved</h3>
          <p>{resolved}</p>
        </div>
      </div>

      <div className="table-container">
        <h3>Complaint List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.name}</td>
                <td>{complaint.location}</td>
                <td>{complaint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
