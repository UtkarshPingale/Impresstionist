const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Video = require("../models/Video");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/home-images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// @route   GET /api/videos
// @desc    Get all videos
// @access  Private/Admin
router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/videos
// @desc    Add a new video
// @access  Private/Admin
router.post("/videos", upload.single("thumbnail"), async (req, res) => {
  try {
    const { url } = req.body;
    const thumbnail = req.file ? req.file.path : null;

    if (!url || !thumbnail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const video = new Video({ url, thumbnail });
    await video.save();
    res.json(video);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT /api/videos/:id
// @desc    Update a video
// @access  Private/Admin
router.put("/videos/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const { url } = req.body;
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.url = url || video.url;
    if (req.file) {
      video.thumbnail = req.file.path;
    }

    await video.save();
    res.json(video);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE /api/videos/:id
// @desc    Delete a video
// @access  Private/Admin
router.delete("/videos/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.remove();
    res.json({ message: "Video removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
