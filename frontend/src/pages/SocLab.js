import { useEffect, useState } from "react";

function SocLab({ user, setPage, setProgress }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/lab/soc")
      .then((res) => res.json())
      .then((data) => setAlerts(data));
  }, []);

  const completeLab = async () => {
    await fetch("http://127.0.0.1:8000/progress/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, lab_id: "soc" }),
    });
    setProgress((prev) => [...prev, "SOC"]);
    setPage("dashboard");
  };

  return (
    <div>
      <h2>SOC Lab</h2>
      <ul>
        {alerts.map((a) => (
          <li key={a.id}>
            {a.alert} - Severity: {a.severity}
          </li>
        ))}
      </ul>
      <button onClick={completeLab}>Complete Lab</button>
      <button onClick={() => setPage("dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default SocLab;
