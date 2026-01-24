function Dashboard({ progress }) {
  const labs = ["phishing", "password", "soc", "object"];
  return (
    <div>
      <h2>User Dashboard</h2>
      <ul>
        {labs.map((lab) => (
          <li key={lab}>
            {lab.charAt(0).toUpperCase() + lab.slice(1)} Lab:{" "}
            {progress.includes(lab) ? "Completed ✅" : "Not started ❌"}
          </li>
        ))}
      </ul>
      <p>Progress updates dynamically as labs are completed.</p>
    </div>
  );
}

export default Dashboard;
