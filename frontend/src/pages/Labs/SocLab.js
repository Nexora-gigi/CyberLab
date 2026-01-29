import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function SOCLab() {
  const navigate = useNavigate();

  return (
    <div className="lab-page">
      <h1>SOC Lab 🖥️</h1>
      <p>Simulate Security Operations Center tasks and alerts.</p>
      <ul>
        <li>Monitor network traffic</li>
        <li>Analyze security logs</li>
        <li>Respond to alerts in real-time</li>
      </ul>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default SOCLab;
