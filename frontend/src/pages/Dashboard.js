import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelopeOpenText, FaNetworkWired, FaObjectGroup } from "react-icons/fa";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>CyberLab Dashboard</h1>
      <p>Select a lab to begin your training</p>

      <div className="lab-grid">
        <div className="lab-card" onClick={() => navigate("/labs/password")}>
          <FaLock size={45} color="#4cafeb" />
          <h3>Password Security Lab</h3>
          <p>Learn how to create strong passwords</p>
        </div>

        <div className="lab-card" onClick={() => navigate("/labs/phishing")}>
          <FaEnvelopeOpenText size={45} color="#4cafeb" />
          <h3>Phishing Awareness Lab</h3>
          <p>Identify malicious emails</p>
        </div>

        <div className="lab-card" onClick={() => navigate("/labs/soc")}>
          <FaNetworkWired size={45} color="#4cafeb" />
          <h3>SOC Lab</h3>
          <p>Simulate Security Operations Center tasks</p>
        </div>

        <div className="lab-card" onClick={() => navigate("/labs/object")}>
          <FaObjectGroup size={45} color="#4cafeb" />
          <h3>Object Detection Lab</h3>
          <p>Learn AI-based object detection techniques</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
