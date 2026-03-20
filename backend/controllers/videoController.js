import Video from "../models/video.js";

export const uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;

    const newVideo = new Video({
      title,
      filename: req.file.filename,
      filepath: `/uploads/${req.file.filename}`,
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const videos = await Video.find().sort({ uploadedAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
