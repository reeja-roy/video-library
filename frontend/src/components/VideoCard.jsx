function VideoCard({ video, onPlay }) {
  return (
    <div style={styles.card}>
      {/* Thumbnail Placeholder */}
      <div style={styles.thumbnail}>
        <span>No Thumbnail</span>
      </div>

      <div style={styles.content}>
        <h4 style={styles.videoTitle}>
          {video.title || "Untitled Video"}
        </h4>

        <button style={styles.playBtn} onClick={onPlay}>
          ▶ Play
        </button>
      </div>
    </div>
  );
}

export default VideoCard;

const styles = {
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "0.2s",
  },
  thumbnail: {
    height: "150px",
    background: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9ca3af",
  },
  content: {
    padding: "12px",
  },
  videoTitle: {
    margin: "0 0 10px",
    fontSize: "14px",
  },
  playBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};