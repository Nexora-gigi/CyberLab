import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PhishingLab from "./pages/PhishingLab";
import PasswordLab from "./pages/PasswordLab";
import SocLab from "./pages/SocLab";
import ObjectLab from "./pages/ObjectLab";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://127.0.0.1:8000/progress/${user}`)
        .then((res) => res.json())
        .then((data) => setProgress(data.completed_labs));
    }
  }, [user]);

  if (!user) return <Login setUser={setUser} />;

  let content;
  switch (page) {
    case "dashboard":
      content = <Dashboard progress={progress} />;
      break;
    case "phishing":
      content = <PhishingLab user={user} setProgress={setProgress} />;
      break;
    case "password":
      content = <PasswordLab user={user} setProgress={setProgress} />;
      break;
    case "soc":
      content = <SocLab user={user} setProgress={setProgress} />;
      break;
    case "object":
      content = <ObjectLab user={user} setProgress={setProgress} />;
      break;
    default:
      content = <Dashboard progress={progress} />;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Welcome to Nexora Cyber Lab</h1>
      <Navbar setPage={setPage} />
      {content}
    </div>
  );
}

export default App;
