import { useParams } from "react-router-dom";
import { getVideoById } from "../services/VideoApi";
import { useEffect, useState } from "react";

function VideoPlayer() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await getVideoById(id);
        setVideoData(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!videoData) return <p>Loading...</p>;

  const videoUrl = `http://localhost:4000${videoData.filepath}`;

  return (
    <div>
      <h2>{videoData.title}</h2>

      <video width="700" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support video
      </video>
    </div>
  );
}

export default VideoPlayer;