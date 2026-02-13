import { useState } from "react";

function ComplaintForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      location,
      type,
      description,
    });

    setMessage("Complaint submitted successfully!");

    // Clear form
    setName("");
    setLocation("");
    setType("");
    setDescription("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register a Complaint</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Location:</label><br />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Complaint Type:</label><br />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Garbage Overflow">Garbage Overflow</option>
            <option value="Missed Pickup">Missed Pickup</option>
            <option value="Illegal Dumping">Illegal Dumping</option>
          </select>
        </div>

        <br />

        <div>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Submit Complaint</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default ComplaintForm;
