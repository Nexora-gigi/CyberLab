import { useEffect, useState } from "react";

function PasswordLab({ user, setProgress }) {
  const [question, setQuestion] = useState(null);
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/lab/password")
      .then(res => res.json())
      .then(data => setQuestion(data));
  }, []);

  const handleCheck = () => {
    fetch("http://127.0.0.1:8000/lab/password/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: input }),
    })
      .then(res => res.json())
      .then(data => {
        setResult(`Password Strength: ${data.strength}`);
        fetch("http://127.0.0.1:8000/progress/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user, lab_id: "password" }),
        }).then(() =>
          setProgress(prev => [...new Set([...prev, "password"])])
        );
      });
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div className="card">
      <h2>Password Security Lab</h2>
      <p>{question.prompt}</p>
      <input
        value={input}
        placeholder="Enter password"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleCheck}>Check Strength</button>
      <p>{result}</p>
    </div>
  );
}

export default PasswordLab;
