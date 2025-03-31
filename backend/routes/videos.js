const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const Video = require("../models/Video"); // Import the Video model

// Set up multer storage for thumbnail uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/homevideo");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

// GET all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
});

// POST new video
router.post("/", upload.single("thumbnail"), async (req, res) => {
  try {
    console.log("Video upload request received:");
    console.log("Request body:", req.body); // Debug: log request body
    console.log("Request file:", req.file); // Debug: log file info
    
    const { url, title } = req.body;
    
    if (!url) {
      return res.status(400).json({ message: "Video URL is required" });
    }
    
    // Validate URL
    let videoUrl = url;
    
    // Format URL for embed if needed (for different platforms)
    if (url.includes('instagram.com')) {
      // Keep Instagram URLs as is - they'll be embedded with their own player
      videoUrl = url;
    } else if (url.includes('youtube.com') && !url.includes('embed')) {
      // Convert standard YouTube URLs to embed format
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (videoId) {
        videoUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Create new video using the Mongoose model
    const newVideo = new Video({
      url: videoUrl,
      title: title || `Video ${Date.now()}`,
      createdAt: new Date()
    });

    // Add thumbnail path if a file was uploaded
    if (req.file) {
      newVideo.thumbnail = `/uploads/homevideo/${req.file.filename}`;
      newVideo.localThumbnailPath = path.join(__dirname, "../uploads/homevideo", req.file.filename);
    } else {
      // Use default thumbnail if none was uploaded
      newVideo.thumbnail = "/uploads/homevideo/default-thumbnail.jpg";
    }

    // Save to MongoDB with explicit error handling
    try {
      const savedVideo = await newVideo.save();
      console.log("New video saved to MongoDB:", savedVideo);
      res.status(201).json(savedVideo);
    } catch (dbError) {
      console.error("MongoDB save error:", dbError);
      return res.status(500).json({ 
        message: "Error saving video to database", 
        error: dbError.message 
      });
    }
  } catch (error) {
    console.error("Error in POST /api/videos:", error);
    res.status(500).json({ 
      message: "Server error processing video upload", 
      error: error.toString() 
    });
  }
});

// UPDATE video
router.put("/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const { id } = req.params;
    const { url, title } = req.body;
    
    // Find the video
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Update fields
    if (url) video.url = url;
    if (title) video.title = title;
    video.updatedAt = new Date();

    // Update thumbnail if a new one was uploaded
    if (req.file) {
      // Remove old thumbnail file if it exists (optional cleanup)
      if (video.localThumbnailPath && fs.existsSync(video.localThumbnailPath)) {
        fs.unlinkSync(video.localThumbnailPath);
      }
      video.thumbnail = `/uploads/homevideo/${req.file.filename}`;
      video.localThumbnailPath = path.join(__dirname, "../uploads/homevideo", req.file.filename);
    }

    await video.save();
    res.json(video);
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
});

// DELETE video
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the video
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Remove thumbnail file if it exists (optional cleanup)
    if (video.localThumbnailPath && fs.existsSync(video.localThumbnailPath)) {
      fs.unlinkSync(video.localThumbnailPath);
    }

    // Remove video from database
    await Video.findByIdAndDelete(id);
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
});

module.exports = router;
