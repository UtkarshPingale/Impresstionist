const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  artwork: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artwork",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "checkout", "completed", "abandoned"],
    default: "active",
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "paypal", "stripe"],
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update total amount before saving
cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
