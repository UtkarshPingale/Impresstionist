const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Artwork = require("../models/Artwork");
const auth = require("../middleware/auth"); 

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/artworks");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});

// @route   GET api/artworks
// @desc    Get all artworks
// @access  Public
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/artworks/featured
// @desc    Get featured artworks
// @access  Public
router.get("/featured", async (req, res) => {
  try {
    const artworks = await Artwork.find({ isFeatured: true }).limit(6);
    res.json(artworks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/artworks/:id
// @desc    Get artwork by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }
    res.json(artwork);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Artwork not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   POST api/artworks
// @desc    Create an artwork
// @access  Private/Admin
router.post("/", [auth, upload.single("image")], async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      style,
      year,
      dimensions,
      isFeatured,
      arModelUrl,
    } = req.body;

    const artwork = new Artwork({
      title,
      description,
      price,
      category,
      style,
      year,
      dimensions,
      isFeatured,
      arModelUrl,
      image: req.file ? req.file.path : null,
    });

    await artwork.save();
    res.json(artwork);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/artworks/:id
// @desc    Update an artwork
// @access  Private/Admin
router.put("/:id", [auth, upload.single("image")], async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    const {
      title,
      description,
      price,
      category,
      style,
      year,
      dimensions,
      isFeatured,
      arModelUrl,
    } = req.body;

    artwork.title = title;
    artwork.description = description;
    artwork.price = price;
    artwork.category = category;
    artwork.style = style;
    artwork.year = year;
    artwork.dimensions = dimensions;
    artwork.isFeatured = isFeatured;
    artwork.arModelUrl = arModelUrl;
    if (req.file) {
      artwork.image = req.file.path;
    }

    await artwork.save();
    res.json(artwork);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Artwork not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/artworks/:id
// @desc    Delete an artwork
// @access  Private/Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    await artwork.remove();
    res.json({ message: "Artwork removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Artwork not found" });
    }
    res.status(500).send("Server error");
  }
});


module.exports = router;
