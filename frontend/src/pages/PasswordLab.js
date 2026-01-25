import { useState } from "react";

function PasswordLab({ user, setPage, setProgress }) {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const checkPassword = async () => {
    const res = await fetch("http://127.0.0.1:8000/lab/password/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setStrength(data.strength);
  };

  const completeLab = async () => {
    await fetch("http://127.0.0.1:8000/progress/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, lab_id: "password" }),
    });
    setProgress((prev) => [...prev, "Password"]);
    setPage("dashboard");
  };

  return (
    <div>
      <h2>Password Lab</h2>
      <input
        type="text"
        placeholder="Enter a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={checkPassword}>Check Strength</button>
      {strength && <p>Password strength: {strength}</p>}
      <button onClick={completeLab}>Complete Lab</button>
      <button onClick={() => setPage("dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default PasswordLab;
