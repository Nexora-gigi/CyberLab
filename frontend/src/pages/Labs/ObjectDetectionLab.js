import React, { useState } from "react";
import LabQuiz from "../../components/LabQuiz";
import AIHelper from "../../components/AIHelper";
import "../../App.css";

function ObjectDetectionLab() {
  const [startQuiz, setStartQuiz] = useState(false);
  const username = localStorage.getItem("username");

  const saveProgress = async () => {
    await fetch(
      `http://127.0.0.1:8000/progress/update?username=${username}&lab_id=object&progress=100`,
      { method: "POST" }
    );
  };

  const questions = [
    {
      question: "Object detection is a field of?",
      type: "text",
      correct: "computer vision",
    },
    {
      question: "YOLO is used for?",
      type: "mcq",
      options: ["Object detection", "Encryption", "Firewalls"],
      correct: "Object detection",
    },
    {
      question: "Bounding boxes are?",
      type: "text",
      correct: "rectangles",
    },
    {
      question: "CNNs are used because they?",
      type: "text",
      correct: "extract features",
    },
    {
      question: "Object detection differs from classification because it?",
      type: "text",
      correct: "locates objects",
    },
    {
      question: "CCTV + AI improves?",
      type: "mcq",
      options: ["Security", "Gaming"],
      correct: "Security",
    },
    {
      question: "False detection means?",
      type: "text",
      correct: "incorrect object",
    },
    {
      question: "Training data must be?",
      type: "text",
      correct: "labeled",
    },
    {
      question: "Object detection output includes?",
      type: "mcq",
      options: ["Labels and boxes", "Passwords"],
      correct: "Labels and boxes",
    },
    {
      question: "Main risk of bias is?",
      type: "text",
      correct: "inaccuracy",
    },
  ];

  return (
    <div className="lab-container">
      <h1>Object Detection Lab</h1>

      {!startQuiz ? (
        <>
          <h3>Mini Lecture</h3>
          <p>
            Object detection allows machines to identify and locate objects
            within images or video, commonly used in surveillance and automation.
          </p>

          <button className="start-btn" onClick={() => setStartQuiz(true)}>
            Start Quiz
          </button>
        </>
      ) : (
        <LabQuiz questions={questions} onPass={saveProgress} />
      )}

      <AIHelper lab="object" />
    </div>
  );
}

export default ObjectDetectionLab;
