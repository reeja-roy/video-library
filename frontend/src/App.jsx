import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoList from "./pages/VideoList";
import VideoUpload from "./pages/VideoUpload";
import VideoPlayer from "./pages/VideoPlayer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/upload" element={<VideoUpload />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;