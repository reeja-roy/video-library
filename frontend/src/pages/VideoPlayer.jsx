import { useParams, useNavigate } from "react-router-dom";
import { getVideoById, BASE_URL } from "../services/VideoApi";
import { useEffect, useState } from "react";

function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchVideo = async () => {
      try {
        const data = await getVideoById(id);
        setVideoData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (!id) return <p>Invalid video ID</p>;

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Loading */}
      {loading && (
        <div style={styles.skeletonBox}></div>
      )}

      {/* Error */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Content */}
      {!loading && videoData && videoData.filepath && (
        <div style={styles.playerWrapper}>
          {/* Video */}
          <div style={styles.videoContainer}>
            <video controls style={styles.video}>
              <source
                src={`${BASE_URL}${videoData.filepath}`}
                type="video/mp4"
              />
            </video>
          </div>

          {/* Info Section */}
          <div style={styles.info}>
            <h2 style={styles.title}>
              {videoData.title || "Untitled Video"}
            </h2>

            <p style={styles.meta}>
              Uploaded:{" "}
              {videoData.uploadedAt
                ? new Date(videoData.uploadedAt).toLocaleString()
                : "Unknown"}
            </p>

            <p style={styles.path}>
              File: {videoData.filename}
            </p>
          </div>
        </div>
      )}

      {/* Invalid Data */}
      {!loading && videoData && !videoData.filepath && (
        <p>Invalid video data</p>
      )}
    </div>
  );
}

export default VideoPlayer;


const styles = {
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px",
    background: "#f9fafb",
    minHeight: "100vh",
  },

  backBtn: {
    marginBottom: "15px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "#2563eb",
  },

  playerWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  videoContainer: {
    width: "100%",
    background: "#000",
    borderRadius: "10px",
    overflow: "hidden",
  },

  video: {
    width: "100%",
    height: "500px",
    objectFit: "contain",
  },

  info: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "600",
  },

  meta: {
    marginTop: "8px",
    fontSize: "13px",
    color: "#6b7280",
  },

  path: {
    marginTop: "6px",
    fontSize: "13px",
    color: "#9ca3af",
  },

  skeletonBox: {
    width: "100%",
    height: "400px",
    background: "#e5e7eb",
    borderRadius: "10px",
    animation: "pulse 1.5s infinite",
  },

  error: {
    color: "red",
    marginTop: "20px",
  },
};