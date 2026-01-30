import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear any session storage / auth token (if you have one)
    localStorage.removeItem("user"); // optional
    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>CyberLab Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      <p>Welcome! Select a lab to start learning:</p>

      <div className="lab-cards">
        <div className="lab-card" onClick={() => navigate("/labs/password")}>
          <h3>Password Lab</h3>
          <p>Learn to create strong passwords.</p>
        </div>

        <div className="lab-card" onClick={() => navigate("/labs/phishing")}>
          <h3>Phishing Lab</h3>
          <p>Spot phishing emails and links.</p>
        </div>

        <div className="lab-card" onClick={() => navigate("/labs/soc")}>
          <h3>SOC Lab</h3>
          <p>See how a Security Operations Center works.</p>
        </div>

        <div className="lab-card" onClick={() => navigate("/labs/object")}>
          <h3>Object Detection Lab</h3>
          <p>Learn how AI detects objects in images/videos.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
