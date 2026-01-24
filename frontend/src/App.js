import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PhishingLab from "./pages/PhishingLab";
import PasswordLab from "./pages/PasswordLab";
import SocLab from "./pages/SocLab";
import ObjectLab from "./pages/ObjectLab";

function App() {
  const [page, setPage] = useState("dashboard");

  let content;
  if (page === "dashboard") content = <Dashboard />;
  if (page === "phishing") content = <PhishingLab />;
  if (page === "password") content = <PasswordLab />;
  if (page === "soc") content = <SocLab />;
  if (page === "object") content = <ObjectLab />;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Welcome to Nexora Cyber Lab</h1>
      <Navbar setPage={setPage} />
      {content}
    </div>
  );
}

export default App;
