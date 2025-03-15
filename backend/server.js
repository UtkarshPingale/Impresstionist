const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

const app = express();

// MongoDB Connection
console.log("Attempting to connect to MongoDB...");
console.log("MongoDB URI exists:", !!process.env.MONGO_URI);

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  maxPoolSize: 10,
  retryWrites: true,
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    console.log("Database connection established");

    // Test the connection by making a simple query
    return mongoose.connection.db.admin().ping();
  })
  .then(() => {
    console.log("Database ping successful - connection is healthy");
  })
  .catch((error) => {
    console.error("MongoDB connection error details:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    if (error.code) {
      console.error("Error code:", error.code);
    }
    if (error.reason) {
      console.error("Error reason:", error.reason);
    }
    console.error("Full error:", error);

    // Exit process on connection failure
    process.exit(1);
  });

// Handle MongoDB connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
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
  console.error("Server error:", err);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;

// Check if port is in use
const server = app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Please try a different port or stop the existing process.`
      );
      process.exit(1);
    } else {
      console.error("Server error:", err);
    }
  });
