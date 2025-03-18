const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      address,
      status: "active",
      role: "user",
    });

    await user.save();

    // Generate JWT token
    const token = user.getSignedJwtToken();

    // Return success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
        shouldRegister: false
      });
    }

    // Find user and explicitly select password
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
        shouldRegister: true
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
        shouldRegister: false
      });
    }

    // Check if user is active
    if (user.status !== "active") {
      return res.status(401).json({
        success: false,
        message: "Your account is not active. Please contact support.",
        shouldRegister: false
      });
    }

    // Generate JWT token
    const token = user.getSignedJwtToken();

    // Create safe user object
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone,
      address: user.address,
    };

    // Return success response
    return res.json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
      shouldRegister: false
    });
  }
});

// @route   GET api/auth/user
// @desc    Get current user
// @access  Private
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
    });
  }
});

// @route   GET api/auth/test-db
// @desc    Test database connection and user collection
// @access  Public
router.get("/test-db", async (req, res) => {
  try {
    console.log("\n=== Database Connection Test ===");

    // Check database connection
    const dbState = mongoose.connection.readyState;
    console.log("Database connection state:", dbState);
    console.log(
      "Connection status:",
      dbState === 0
        ? "Disconnected"
        : dbState === 1
        ? "Connected"
        : dbState === 2
        ? "Connecting"
        : dbState === 3
        ? "Disconnecting"
        : "Unknown"
    );

    // Test database operations
    console.log("\n=== Collection Test ===");
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );

    // Count users
    const userCount = await User.countDocuments();
    console.log("Total users in database:", userCount);

    // Get a sample of users
    const users = await User.find({}).limit(5).select("email name");
    console.log("\nSample users:");
    users.forEach((user) => {
      console.log(`- ${user.email} (${user.name})`);
    });

    return res.json({
      connection: {
        state: dbState,
        status: dbState === 1 ? "Connected" : "Not Connected",
      },
      collections: collections.map((c) => c.name),
      userCount,
      sampleUsers: users.map((u) => ({ email: u.email, name: u.name })),
    });
  } catch (error) {
    console.error("Database test error:", error);
    return res.status(500).json({
      error: "Database test failed",
      details: error.message,
    });
  }
});

module.exports = router;
