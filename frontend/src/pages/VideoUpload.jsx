import { useState } from "react";
import { uploadVideo } from "../services/VideoApi";
import { useNavigate } from "react-router-dom";

function VideoUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a video");
      return;
    }

  const formData = new FormData();
formData.append("video", file);
formData.append("title", title); // or use a separate input

    try {
      await uploadVideo(formData);
      alert("Upload successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input
  type="text"
  placeholder="Enter title"
  onChange={(e) => setTitle(e.target.value)}
/>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default VideoUpload;