import { useEffect, useState } from "react";

function ObjectLab({ user, setPage, setProgress }) {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/lab/object")
      .then((res) => res.json())
      .then((data) => setObjects(data));
  }, []);

  const completeLab = async () => {
    await fetch("http://127.0.0.1:8000/progress/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, lab_id: "object" }),
    });
    setProgress((prev) => [...prev, "Object Detection"]);
    setPage("dashboard");
  };

  return (
    <div>
      <h2>Object Detection Lab</h2>
      <ul>
        {objects.map((obj) => (
          <li key={obj.id}>
            {obj.label}: <img src={obj.image} alt={obj.label} width="100" />
          </li>
        ))}
      </ul>
      <button onClick={completeLab}>Complete Lab</button>
      <button onClick={() => setPage("dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default ObjectLab;
