import { useEffect, useState } from "react";

function SocLab({ user, setProgress }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/lab/soc")
      .then(res => res.json())
      .then(data => setAlerts(data));
  }, []);

  const handleInvestigate = () => {
    fetch("http://127.0.0.1:8000/progress/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, lab_id: "soc" }),
    }).then(() =>
      setProgress(prev => [...new Set([...prev, "soc"])])
    );
  };

  return (
    <div className="card">
      <h2>SOC / Intrusion Detection Lab</h2>
      {alerts.map(alert => (
        <div key={alert.id}>
          <p><strong>{alert.alert}</strong> — {alert.severity}</p>
        </div>
      ))}
      <button onClick={handleInvestigate}>Mark as Investigated</button>
    </div>
  );
}

export default SocLab;
