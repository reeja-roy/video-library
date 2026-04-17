import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          🎬 Video App
        </h2>

        <button onClick={() => navigate("/upload")}>
          Upload
        </button>
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

const styles = {
  container: { background: "#f9fafb", minHeight: "100vh" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#111",
    color: "#fff",
  },
  main: { padding: "20px 30px" },
};