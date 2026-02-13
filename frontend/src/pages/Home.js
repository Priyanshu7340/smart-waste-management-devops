import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Welcome to Smart Waste Management Platform</h2>
      <p>Select an option below:</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/complaint">
          <button style={{ marginRight: "10px" }}>
            Register Complaint
          </button>
        </Link>

        <Link to="/dashboard">
          <button>
            Admin Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
