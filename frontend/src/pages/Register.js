import { useState } from "react";

function Register({ setUser, setPage }) {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !fullName || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, full_name: fullName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);
      setSuccess(data.message);
      setUser(username);
      setPage("dashboard"); // go to home/dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <p>
        Already have an account? <button onClick={() => setPage("login")}>Login</button>
      </p>
    </div>
  );
}

export default Register;
