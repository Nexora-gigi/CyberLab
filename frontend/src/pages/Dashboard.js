function Dashboard({ setPage, user, progress }) {
  return (
    <div>
      <h1>Welcome, {user}!</h1>
      <p>Completed Labs: {progress.join(", ") || "None"}</p>

      <h2>Select a Lab</h2>
      <ul>
        <li><button onClick={() => setPage("phishing")}>Phishing Lab</button></li>
        <li><button onClick={() => setPage("password")}>Password Lab</button></li>
        <li><button onClick={() => setPage("soc")}>SOC Lab</button></li>
        <li><button onClick={() => setPage("object")}>Object Detection Lab</button></li>
      </ul>
    </div>
  );
}

export default Dashboard;
