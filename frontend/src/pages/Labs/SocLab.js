import React, { useState } from "react";
import LabQuiz from "../../components/LabQuiz";
import AIHelper from "../../components/AIHelper";
import "../../App.css";

function SocLab() {
  const [startQuiz, setStartQuiz] = useState(false);
  const username = localStorage.getItem("username");

  const saveProgress = async () => {
    await fetch(
      `http://127.0.0.1:8000/progress/update?username=${username}&lab_id=soc&progress=100`,
      { method: "POST" }
    );
  };

  const questions = [
    {
      question: "SOC stands for?",
      type: "text",
      correct: "security operations center",
    },
    {
      question: "SOC analysts monitor?",
      type: "mcq",
      options: ["Emails", "Security events", "Web design"],
      correct: "Security events",
    },
    {
      question: "Multiple failed logins indicate?",
      type: "text",
      correct: "brute force",
    },
    {
      question: "SIEM tools are used for?",
      type: "mcq",
      options: ["Log analysis", "Coding", "Encryption"],
      correct: "Log analysis",
    },
    {
      question: "First SOC response step?",
      type: "text",
      correct: "identify",
    },
    {
      question: "IDS stands for?",
      type: "text",
      correct: "intrusion detection system",
    },
    {
      question: "Alert fatigue means?",
      type: "text",
      correct: "too many alerts",
    },
    {
      question: "SOC operates?",
      type: "mcq",
      options: ["24/7", "9-5"],
      correct: "24/7",
    },
    {
      question: "False positive means?",
      type: "text",
      correct: "incorrect alert",
    },
    {
      question: "SOC goal is to?",
      type: "text",
      correct: "detect and respond",
    },
  ];

  return (
    <div className="lab-container">
      <h1>SOC Analysis Lab</h1>

      {!startQuiz ? (
        <>
          <h3>Mini Lecture</h3>
          <p>
            A Security Operations Center (SOC) is responsible for continuously
            monitoring, detecting, and responding to cybersecurity threats.
          </p>

          <button className="start-btn" onClick={() => setStartQuiz(true)}>
            Start Quiz
          </button>
        </>
      ) : (
        <LabQuiz questions={questions} onPass={saveProgress} />
      )}

      <AIHelper lab="soc" />
    </div>
  );
}

export default SocLab;
