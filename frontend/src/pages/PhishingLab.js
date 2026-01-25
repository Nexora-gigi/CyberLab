import { useEffect, useState } from "react";

function PhishingLab({ user, setPage, setProgress }) {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/lab/phishing")
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const handleSubmit = async () => {
    if (selected === data.answer) alert("Correct!");
    else alert("Incorrect!");

    // Save progress
    await fetch("http://127.0.0.1:8000/progress/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, lab_id: "phishing" }),
    });
    setProgress((prev) => [...prev, "Phishing"]);
    setPage("dashboard");
  };

  if (!data) return <p>Loading lab...</p>;

  return (
    <div>
      <h2>Phishing Lab</h2>
      <p>{data.email}</p>
      {data.options.map((opt) => (
        <label key={opt}>
          <input
            type="radio"
            name="phish"
            value={opt}
            onChange={(e) => setSelected(e.target.value)}
          />
          {opt}
        </label>
      ))}
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={() => setPage("dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default PhishingLab;
