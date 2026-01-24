function Navbar({ setPage }) {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <button onClick={() => setPage("dashboard")}>Dashboard</button>
      <button onClick={() => setPage("phishing")}>Phishing Lab</button>
      <button onClick={() => setPage("password")}>Password Lab</button>
    </nav>
  );
}

export default Navbar;
