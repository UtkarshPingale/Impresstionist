const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Artwork = require("../models/Artwork");
const auth = require("../middleware/auth");

// Get cart
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      // Create a new cart for the user if it doesn't exist
      cart = new Cart({
        userId: req.user.userId,
        items: [],
        total: 0,
      });
      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: "Failed to get cart" });
  }
});

// Add to cart
router.post("/add", auth, async (req, res) => {
  try {
    const { artworkId, quantity = 1 } = req.body;

    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res
        .status(404)
        .json({ success: false, message: "Artwork not found" });
    }

    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.artworkId.toString() === artworkId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        artworkId: artwork._id,
        title: artwork.title,
        price: artwork.price,
        quantity,
        imageUrl: artwork.images[0]?.url || "",
      });
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Failed to add to cart" });
  }
});

// Update quantity
router.put("/update/:artworkId", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { artworkId } = req.params;

    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
    }

    const item = cart.items.find(
      (item) => item.artworkId.toString() === artworkId
    );
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.artworkId.toString() !== artworkId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ success: false, message: "Failed to update cart" });
  }
});

// Remove from cart
router.delete("/remove/:artworkId", auth, async (req, res) => {
  try {
    const { artworkId } = req.params;

    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.json({ success: true, cart: { items: [], total: 0 } });
    }

    cart.items = cart.items.filter(
      (item) => item.artworkId.toString() !== artworkId
    );
    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove from cart" });
  }
});

// Clear cart
router.delete("/clear", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.json({ success: true, cart: { items: [], total: 0 } });
    }

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      cart: { items: [], total: 0 },
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
});

module.exports = router;
