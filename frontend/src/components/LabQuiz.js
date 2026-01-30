import React, { useState } from "react";
import "../App.css";

function LabQuiz({ questions, onPass }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (idx, value) => {
    setAnswers({ ...answers, [idx]: value });
  };

  const handleSubmit = () => {
    let correctCount = 0;

    questions.forEach((q, idx) => {
      const ans = (answers[idx] || "").toString().toLowerCase().trim();
      const correct = q.correct.toString().toLowerCase().trim();
      if (ans === correct) correctCount++;
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);

    // Award XP: 10 points per correct answer
    const xp = correctCount * 10;
    const username = localStorage.getItem("username");

    fetch(`http://127.0.0.1:8000/progress/update_xp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, xp }),
    });

    // Call lab-specific pass function
    if (onPass) onPass();
  };

  return (
    <div className="quiz-container">
      {questions.map((q, idx) => (
        <div key={idx} className="quiz-question">
          <p>{idx + 1}. {q.question}</p>

          {q.type === "mcq" ? (
            <div>
              {q.options.map((opt, i) => (
                <label key={i} className="option-label">
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    value={opt}
                    disabled={submitted}
                    onChange={(e) => handleChange(idx, e.target.value)}
                  /> {opt}
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              disabled={submitted}
              value={answers[idx] || ""}
              onChange={(e) => handleChange(idx, e.target.value)}
              placeholder="Type your answer..."
            />
          )}

          {submitted && (
            <p className={`feedback ${answers[idx]?.toLowerCase() === q.correct.toLowerCase() ? "correct" : "incorrect"}`}>
              {answers[idx]?.toLowerCase() === q.correct.toLowerCase()
                ? "✅ Correct!"
                : `❌ Incorrect. Answer: ${q.correct}`}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <button className="submit-btn" onClick={handleSubmit}>Submit Quiz</button>
      ) : (
        <div className="score-display">
          <h3>Score: {score}%</h3>
          {score === 100 && <p>🏆 Perfect Score! Badge earned!</p>}
          {score >= 70 && score < 100 && <p>🎉 Good job! Badge earned!</p>}
          {score < 70 && <p>Keep practicing! 📝</p>}
        </div>
      )}
    </div>
  );
}

export default LabQuiz;
