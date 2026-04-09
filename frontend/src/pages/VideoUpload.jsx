import { useState } from "react";
import { uploadVideo } from "../services/VideoApi";
import { useNavigate } from "react-router-dom";

function VideoUpload() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return setError("Title is required");
    }

    if (!file) {
      return setError("Please select a video file");
    }

    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", file);

    try {
      setLoading(true);
      await uploadVideo(formData);
      navigate("/");
    } catch (err) {
      setError("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Upload Video</h2>
        <p style={styles.subtitle}>
          Add a new video to your library
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Title */}
          <div style={styles.field}>
            <label style={styles.label}>Video Title</label>
            <input
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* File Upload */}
          <div style={styles.field}>
            <label style={styles.label}>Select Video</label>

            <div style={styles.fileBox}>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {file && (
              <div style={styles.fileInfo}>
                <p><strong>Name:</strong> {file.name}</p>
                <p>
                  <strong>Size:</strong>{" "}
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>

          {/* Error */}
          {error && <p style={styles.error}>{error}</p>}

          {/* Actions */}
          <div style={styles.actions}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={() => navigate("/")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VideoUpload;

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f9fafb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "600",
  },

  subtitle: {
    margin: "5px 0 20px",
    color: "#6b7280",
    fontSize: "14px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "500",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  fileBox: {
    border: "2px dashed #ddd",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    cursor: "pointer",
  },

  fileInfo: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#374151",
  },

  error: {
    color: "red",
    fontSize: "14px",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  cancelBtn: {
    background: "#e5e7eb",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  submitBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};