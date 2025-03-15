const mongoose = require("mongoose");

const exhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "current", "past"],
    required: true,
  },
  location: {
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  images: [
    {
      url: String,
      alt: String,
      isMain: Boolean,
    },
  ],
  artworks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  admission: {
    type: String,
    enum: ["free", "paid"],
    default: "free",
  },
  price: {
    amount: Number,
    currency: {
      type: String,
      default: "USD",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for date-based queries
exhibitionSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model("Exhibition", exhibitionSchema);
