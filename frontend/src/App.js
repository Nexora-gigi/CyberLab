import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PhishingLab from "./pages/PhishingLab";
import PasswordLab from "./pages/PasswordLab";
import SocLab from "./pages/SocLab";
import ObjectLab from "./pages/ObjectLab";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [progress, setProgress] = useState([]);

  let content;
  switch (page) {
    case "login":
      content = <Login setUser={setUser} setPage={setPage} />;
      break;
    case "register":
      content = <Register setUser={setUser} setPage={setPage} />;
      break;
    case "dashboard":
      content = <Dashboard setPage={setPage} user={user} progress={progress} setProgress={setProgress} />;
      break;
    case "phishing":
      content = <PhishingLab user={user} setPage={setPage} setProgress={setProgress} />;
      break;
    case "password":
      content = <PasswordLab user={user} setPage={setPage} setProgress={setProgress} />;
      break;
    case "soc":
      content = <SocLab user={user} setPage={setPage} setProgress={setProgress} />;
      break;
    case "object":
      content = <ObjectLab user={user} setPage={setPage} setProgress={setProgress} />;
      break;
    default:
      content = <Login setUser={setUser} setPage={setPage} />;
  }

  return <div className="container">{content}</div>;
}

export default App;
