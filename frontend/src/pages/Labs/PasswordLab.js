import React, { useState } from "react";
import LabQuiz from "../../components/LabQuiz";
import AIHelper from "../../components/AIHelper";
import "../../App.css";

function PasswordLab() {
  const [startQuiz, setStartQuiz] = useState(false);
  const username = localStorage.getItem("username");

  const saveProgress = async () => {
    await fetch(
      `http://127.0.0.1:8000/progress/update?username=${username}&lab_id=password&progress=100`,
      { method: "POST" }
    );
  };

  const questions = [
    {
      question: "Minimum recommended password length?",
      type: "text",
      correct: "12",
    },
    {
      question: "Should you reuse passwords across sites?",
      type: "mcq",
      options: ["Yes", "No"],
      correct: "No",
    },
    {
      question: "Strong passwords include?",
      type: "text",
      correct: "letters numbers symbols",
    },
    {
      question: "A password manager helps by?",
      type: "text",
      correct: "storing passwords securely",
    },
    {
      question: "Two-factor authentication adds?",
      type: "mcq",
      options: ["Extra security", "Faster login"],
      correct: "Extra security",
    },
    {
      question: "Common weak passwords include?",
      type: "text",
      correct: "123456",
    },
    {
      question: "Sharing passwords is safe?",
      type: "mcq",
      options: ["Yes", "No"],
      correct: "No",
    },
    {
      question: "Password hints should be?",
      type: "text",
      correct: "hard to guess",
    },
    {
      question: "Using a passphrase is?",
      type: "mcq",
      options: ["Recommended", "Not recommended"],
      correct: "Recommended",
    },
    {
      question: "Should you write passwords on sticky notes?",
      type: "mcq",
      options: ["Yes", "No"],
      correct: "No",
    },
  ];

  return (
    <div className="lab-container">
      <h1>Password Security Lab</h1>

      {!startQuiz ? (
        <>
          <h3>Mini Lecture</h3>
          <p>
            Strong passwords prevent unauthorized access. Use long, unique
            passwords with letters, numbers, and symbols.
          </p>

          <button className="start-btn" onClick={() => setStartQuiz(true)}>
            Start Quiz
          </button>
        </>
      ) : (
        <LabQuiz questions={questions} onPass={saveProgress} />
      )}

      <AIHelper lab="password" />
    </div>
  );
}

export default PasswordLab;
