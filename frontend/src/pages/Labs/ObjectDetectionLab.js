import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function ObjectDetectionLab() {
  const navigate = useNavigate();

  return (
    <div className="lab-page">
      <h1>Object Detection Lab 🤖</h1>
      <p>Learn AI-based object detection using images and models.</p>
      <ul>
        <li>Upload images to detect objects</li>
        <li>Explore bounding boxes and predictions</li>
        <li>Understand basic computer vision concepts</li>
      </ul>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default ObjectDetectionLab;
