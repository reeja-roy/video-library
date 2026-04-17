import { useEffect, useState } from "react";
import { getVideos } from "../services/VideoApi";
import { useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await getVideos();
      setVideos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Video Library</h2>

      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        <div style={styles.grid}>
          {videos.map((video) => {
            if (!video._id) return null;

            return (
              <VideoCard
                key={video._id}
                video={video}
                onPlay={() => navigate(`/video/${video._id}`)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default VideoList;

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "15px",
  },
};