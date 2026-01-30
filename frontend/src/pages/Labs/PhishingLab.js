import React, { useState } from "react";
import LabQuiz from "../../components/LabQuiz";
import AIHelper from "../../components/AIHelper";
import "../../App.css";

function PhishingLab() {
  const [startQuiz, setStartQuiz] = useState(false);
  const username = localStorage.getItem("username");

  const saveProgress = async () => {
    await fetch(
      `http://127.0.0.1:8000/progress/update?username=${username}&lab_id=phishing&progress=100`,
      { method: "POST" }
    );
  };

  const questions = [
    {
      question: "What is phishing?",
      type: "text",
      correct: "social engineering",
    },
    {
      question: "Which is a phishing indicator?",
      type: "mcq",
      options: ["Urgent tone", "Correct grammar", "Official domain"],
      correct: "Urgent tone",
    },
    {
      question: "Phishing often asks you to?",
      type: "mcq",
      options: ["Ignore email", "Verify account", "Log out"],
      correct: "Verify account",
    },
    {
      question: "Fake links often mimic?",
      type: "text",
      correct: "legitimate websites",
    },
    {
      question: "HTTPS guarantees safety?",
      type: "mcq",
      options: ["Yes", "No"],
      correct: "No",
    },
    {
      question: "Unexpected attachments are?",
      type: "mcq",
      options: ["Safe", "Suspicious"],
      correct: "Suspicious",
    },
    {
      question: "Phishing targets which info?",
      type: "text",
      correct: "credentials",
    },
    {
      question: "CEO fraud is a type of?",
      type: "text",
      correct: "phishing",
    },
    {
      question: "Best action after phishing email?",
      type: "mcq",
      options: ["Reply", "Report", "Click link"],
      correct: "Report",
    },
    {
      question: "Phishing relies on?",
      type: "text",
      correct: "trust",
    },
  ];

  return (
    <div className="lab-container">
      <h1>Phishing Detection Lab</h1>

      {!startQuiz ? (
        <>
          <h3>Mini Lecture</h3>
          <p>
            Phishing is a social engineering attack where attackers trick users
            into revealing sensitive information by impersonating trusted
            entities.
          </p>

          <button className="start-btn" onClick={() => setStartQuiz(true)}>
            Start Quiz
          </button>
        </>
      ) : (
        <LabQuiz questions={questions} onPass={saveProgress} />
      )}

      <AIHelper lab="phishing" />
    </div>
  );
}

export default PhishingLab;
