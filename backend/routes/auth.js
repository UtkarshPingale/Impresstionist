const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone,
      address,
      status: "active", // Set default status
      role: "user", // Set default role
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Return consistent user data structure
    res.status(201).json({
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
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({
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
    console.log("\n=== Login Attempt ===");
    console.log("Email:", email);
    console.log("Password provided:", !!password);

    // Basic validation
    if (!email || !password) {
      console.log("Missing credentials");
      return res.status(400).json({
        message: "Please provide both email and password",
      });
    }

    // Find user with password included
    console.log("\n=== User Lookup ===");
    const user = await User.findOne({ email }).select("+password");
    console.log("User found:", !!user);

    if (!user) {
      console.log("No user found with email:", email);
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.log("\n=== Password Check ===");
    console.log("User has password:", !!user.password);
    console.log("Stored password length:", user.password?.length);
    console.log("Input password length:", password.length);

    // Direct password comparison
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password verification failed");
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.log("\n=== Token Generation ===");
    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    console.log("Token generated successfully");

    // Create safe user object
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    console.log("\n=== Login Success ===");
    console.log("User:", userResponse.email);

    return res.json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("\n=== Login Error ===");
    console.error("Type:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    // Check for specific error types
    if (error.name === "MongoError" || error.name === "MongoServerError") {
      console.error("Database connection error");
      return res.status(500).json({
        message: "Database error occurred",
      });
    }

    return res.status(500).json({
      message: "Login failed. Please try again.",
    });
  }
});

// @route   GET api/auth/user
// @desc    Get current user
// @access  Private
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
