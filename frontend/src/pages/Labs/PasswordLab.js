import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function PasswordLab() {
  const navigate = useNavigate();

  return (
    <div className="lab-page">
      <h1>Password Security Lab 🔐</h1>
      <p>
        Learn how to create strong passwords and avoid common mistakes.
      </p>
      <ul>
        <li>Use at least 12 characters</li>
        <li>Include numbers, symbols, uppercase & lowercase</li>
        <li>Never reuse passwords</li>
      </ul>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default PasswordLab;
