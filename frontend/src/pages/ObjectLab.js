import { useEffect, useState } from "react";

function ObjectLab({ user, setProgress }) {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/lab/object")
      .then(res => res.json())
      .then(data => setObjects(data));
  }, []);

  const markComplete = () => {
    fetch("http://127.0.0.1:8000/progress/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, lab_id: "object" }),
    }).then(() =>
      setProgress(prev => [...new Set([...prev, "object"])])
    );
  };

  return (
    <div className="card">
      <h2>Object Detection Lab</h2>
      {objects.map(obj => (
        <div key={obj.id}>
          <img src={obj.image} alt="object" />
          <p>Label: {obj.label}</p>
        </div>
      ))}
      <button onClick={markComplete}>Complete Lab</button>
    </div>
  );
}

export default ObjectLab;
