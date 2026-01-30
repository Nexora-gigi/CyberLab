import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import PasswordLab from "./pages/Labs/PasswordLab";
import PhishingLab from "./pages/Labs/PhishingLab";
import SocLab from "./pages/Labs/SocLab";
import ObjectDetectionLab from "./pages/Labs/ObjectDetectionLab";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth pages */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Labs */}
        <Route path="/labs/password" element={<PasswordLab />} />
        <Route path="/labs/phishing" element={<PhishingLab />} />
        <Route path="/labs/soc" element={<SocLab />} />
        <Route path="/labs/object" element={<ObjectDetectionLab />} />
      </Routes>
    </Router>
  );
}

export default App;
