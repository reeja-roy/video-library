import express from "express";
import upload from "../middleware/upload.js";
import { uploadVideo, getVideo, getVideoById } from "../controllers/videoController.js";

const router = express.Router();

router.post("/upload", upload.single("video"), uploadVideo);
router.get("/", getVideo);
router.get("/:id", getVideoById);

export default router;