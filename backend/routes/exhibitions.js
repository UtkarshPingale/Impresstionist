const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Exhibition = require("../models/Exhibition");
const auth = require("../middleware/auth");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/exhibitions");
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

// @route   GET api/exhibitions
// @desc    Get all exhibitions
// @access  Public
router.get("/", async (req, res) => {
  try {
    const exhibitions = await Exhibition.find().sort({ startDate: -1 });
    res.json(exhibitions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/exhibitions/current
// @desc    Get current exhibitions
// @access  Public
router.get("/current", async (req, res) => {
  try {
    const currentDate = new Date();
    const exhibitions = await Exhibition.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });
    res.json(exhibitions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/exhibitions/upcoming
// @desc    Get upcoming exhibitions
// @access  Public
router.get("/upcoming", async (req, res) => {
  try {
    const currentDate = new Date();
    const exhibitions = await Exhibition.find({
      startDate: { $gt: currentDate },
    }).sort({ startDate: 1 });
    res.json(exhibitions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/exhibitions/past
// @desc    Get past exhibitions
// @access  Public
router.get("/past", async (req, res) => {
  try {
    const currentDate = new Date();
    const exhibitions = await Exhibition.find({
      endDate: { $lt: currentDate },
    }).sort({ endDate: -1 });
    res.json(exhibitions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/exhibitions/:id
// @desc    Get exhibition by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id);
    if (!exhibition) {
      return res.status(404).json({ message: "Exhibition not found" });
    }
    res.json(exhibition);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Exhibition not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   POST api/exhibitions
// @desc    Create an exhibition
// @access  Private/Admin
router.post("/", [auth, upload.single("image")], async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      location,
      admissionType,
      price,
    } = req.body;

    const exhibition = new Exhibition({
      title,
      description,
      startDate,
      endDate,
      location,
      admissionType,
      price,
      image: req.file ? req.file.path : null,
    });

    await exhibition.save();
    res.json(exhibition);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/exhibitions/:id
// @desc    Update an exhibition
// @access  Private/Admin
router.put("/:id", [auth, upload.single("image")], async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id);
    if (!exhibition) {
      return res.status(404).json({ message: "Exhibition not found" });
    }

    const {
      title,
      description,
      startDate,
      endDate,
      location,
      admissionType,
      price,
    } = req.body;

    exhibition.title = title;
    exhibition.description = description;
    exhibition.startDate = startDate;
    exhibition.endDate = endDate;
    exhibition.location = location;
    exhibition.admissionType = admissionType;
    exhibition.price = price;
    if (req.file) {
      exhibition.image = req.file.path;
    }

    await exhibition.save();
    res.json(exhibition);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Exhibition not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/exhibitions/:id
// @desc    Delete an exhibition
// @access  Private/Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id);
    if (!exhibition) {
      return res.status(404).json({ message: "Exhibition not found" });
    }

    await exhibition.remove();
    res.json({ message: "Exhibition removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Exhibition not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
