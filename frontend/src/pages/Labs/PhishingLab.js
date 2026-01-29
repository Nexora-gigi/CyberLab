import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function PhishingLab() {
  const navigate = useNavigate();

  return (
    <div className="lab-page">
      <h1>Phishing Awareness Lab 📧</h1>
      <p>Identify fake emails and suspicious links.</p>
      <ul>
        <li>Check sender’s email carefully</li>
        <li>Look for typos and suspicious links</li>
        <li>Never share passwords via email</li>
      </ul>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default PhishingLab;
