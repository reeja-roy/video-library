import { useEffect, useState } from "react";
import { getVideos } from "../services/VideoApi";
import { useNavigate } from "react-router-dom";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await getVideos();
      setVideos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Video List</h2>

      <button onClick={() => navigate("/upload")}>
        Upload New Video
      </button>

      <hr />

      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        videos.map((video) => (
          <div key={video._id}>
            <p>{video.title || "No Title"}</p>

            <button onClick={() => navigate(`/video/${video._id}`)}>
              Play
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default VideoList;