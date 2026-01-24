import { useEffect, useState } from "react";

function SocLab() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/lab/soc")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleInvestigate = (id) => {
    alert(`Alert ${id} marked as investigated ✅`);
  };

  if (!alerts.length) return <p>Loading...</p>;

  return (
    <div>
      <h2>SOC / Intrusion Detection Lab</h2>
      {alerts.map((alert) => (
        <div key={alert.id} style={{ marginBottom: "10px" }}>
          <p>
            <strong>{alert.alert}</strong> - Severity: {alert.severity}
          </p>
          <button onClick={() => handleInvestigate(alert.id)}>Investigate</button>
        </div>
      ))}
    </div>
  );
}

export default SocLab;
