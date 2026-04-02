import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // your backend URL
});

export const getVideos = () => API.get("/videos");

export const getVideoById = async (id) =>{
    const res = await API.get(`/videos/${id}`);

    return res.data

}



export const uploadVideo = (formData) =>
  API.post("/videos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });