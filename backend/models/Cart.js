const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    items: [
      {
        artworkId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Artwork",
          required: true,
        },
        title: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        imageUrl: String,
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Update total before saving
cartSchema.pre("save", function (next) {
  this.total = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  next();
});

// Instance method to add item to cart
cartSchema.methods.addItem = async function (artwork, quantity = 1) {
  const existingItem = this.items.find(
    (item) => item.artworkId.toString() === artwork._id.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({
      artworkId: artwork._id,
      title: artwork.title,
      price: artwork.price,
      quantity,
      imageUrl: artwork.imageUrl,
    });
  }

  return this.save();
};

// Instance method to update item quantity
cartSchema.methods.updateItemQuantity = async function (artworkId, quantity) {
  const item = this.items.find(
    (item) => item.artworkId.toString() === artworkId.toString()
  );

  if (!item) {
    throw new Error("Item not found in cart");
  }

  if (quantity <= 0) {
    this.items = this.items.filter(
      (item) => item.artworkId.toString() !== artworkId.toString()
    );
  } else {
    item.quantity = quantity;
  }

  return this.save();
};

// Instance method to remove item
cartSchema.methods.removeItem = async function (artworkId) {
  this.items = this.items.filter(
    (item) => item.artworkId.toString() !== artworkId.toString()
  );
  return this.save();
};

// Instance method to clear cart
cartSchema.methods.clearCart = async function () {
  this.items = [];
  return this.save();
};

module.exports = mongoose.model("Cart", cartSchema);
