import axios from "axios";

export const BASE_URL = "http://localhost:4000";

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const getVideos = async () => {
  const res = await API.get("/videos");
  return res.data;
};

export const getVideoById = async (id) => {
  const res = await API.get(`/videos/${id}`);
  return res.data;
};

export const uploadVideo = (formData) =>
  API.post("/videos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });