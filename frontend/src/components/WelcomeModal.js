import { useState, useEffect } from "react";

function WelcomeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("seenWelcome");
    if (!seen) setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("seenWelcome", "true");
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{
        backgroundColor: "#1b1f2a", padding: "30px", borderRadius: "12px",
        textAlign: "center", color: "#fff", maxWidth: "400px"
      }}>
        <h2>Welcome to CyberLab!</h2>
        <p>Complete labs, earn XP, unlock badges, and have fun learning cybersecurity.</p>
        <button onClick={handleClose} style={{
          marginTop: "15px", padding: "10px 20px", borderRadius: "8px",
          border: "none", background: "#2979ff", color: "#fff", cursor: "pointer"
        }}>Get Started</button>
      </div>
    </div>
  );
}

export default WelcomeModal;
