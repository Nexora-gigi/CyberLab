import { useEffect, useState } from "react";

function PhishingLab({ user, setProgress }) {
  const [question, setQuestion] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/lab/phishing")
      .then(res => res.json())
      .then(data => setQuestion(data));
  }, []);

  const handleAnswer = (option) => {
    if (option === question.answer) {
      setResult("Correct! ✅");
      fetch("http://127.0.0.1:8000/progress/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, lab_id: "phishing" }),
      }).then(() =>
        setProgress(prev => [...new Set([...prev, "phishing"])])
      );
    } else {
      setResult("Incorrect ❌");
    }
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div className="card">
      <h2>Phishing Awareness Lab</h2>
      <p>{question.email}</p>
      {question.options.map(opt => (
        <button key={opt} onClick={() => handleAnswer(opt)}>
          {opt}
        </button>
      ))}
      <p>{result}</p>
    </div>
  );
}

export default PhishingLab;
