import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import VideoUpload from "./pages/VideoUpload";
import VideoPlayer from "./pages/VideoPlayer";
import VideoList from "./pages/VideoList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<VideoList />} />
          <Route path="upload" element={<VideoUpload />} />
          <Route path="video/:id" element={<VideoPlayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;