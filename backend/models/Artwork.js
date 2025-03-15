const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  year: {
    type: Number,
    required: true,
  },
  style: {
    type: String,
    required: true,
    enum: [
      "Contemporary",
      "Abstract",
      "Realistic",
      "Impressionist",
      "Modern",
      "Other",
    ],
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Painting",
      "Sculpture",
      "Photography",
      "Digital Art",
      "Mixed Media",
      "Other",
    ],
  },
  dimensions: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  arModelUrl: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for search functionality
ArtworkSchema.index({
  title: "text",
  description: "text",
  style: "text",
  category: "text",
});

module.exports = mongoose.model("Artwork", ArtworkSchema);
