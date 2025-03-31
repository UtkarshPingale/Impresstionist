const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Untitled Video"
  },
  url: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  localVideoPath: {
    type: String,
    required: false, // Optional if not always stored locally
  },
  localThumbnailPath: {
    type: String,
    required: false, // Optional if not always stored locally
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Video", VideoSchema);
