const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

// @route   GET api/orders
// @desc    Get user's orders
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("items.artwork");
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.artwork");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order belongs to user
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   POST api/orders
// @desc    Create an order
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.artwork"
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const order = new Order({
      user: req.user.id,
      items: cart.items,
      total,
      shippingAddress,
      paymentMethod,
      status: "pending",
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/orders/:id
// @desc    Update order status
// @access  Private/Admin
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
