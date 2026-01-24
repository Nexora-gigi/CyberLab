import { useEffect, useState } from "react";

function ObjectLab() {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/lab/object")
      .then((res) => res.json())
      .then((data) => setObjects(data))
      .catch((err) => console.error(err));
  }, []);

  if (!objects.length) return <p>Loading...</p>;

  return (
    <div>
      <h2>Object Detection Lab</h2>
      {objects.map((obj) => (
        <div key={obj.id} style={{ marginBottom: "15px" }}>
          <img src={obj.image} alt="object" />
          <p>Label: {obj.label}</p>
        </div>
      ))}
    </div>
  );
}

export default ObjectLab;
