const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Impress API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
