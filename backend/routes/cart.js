const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Artwork = require("../models/Artwork");
const auth = require("../middleware/auth");

// @route   GET api/cart
// @desc    Get user's cart
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
      });
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/cart
// @desc    Add item to cart
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { artworkId, quantity } = req.body;

    // Check if artwork exists
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
      });
    }

    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.artwork.toString() === artworkId
    );

    if (itemIndex > -1) {
      // Update quantity if item exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item if it doesn't exist
      cart.items.push({
        artwork: artworkId,
        quantity,
        price: artwork.price,
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/cart/:itemId
// @desc    Update item quantity in cart
// @access  Private
router.put("/:itemId", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === req.params.itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/cart/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete("/:itemId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/cart
// @desc    Clear cart
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
