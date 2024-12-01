const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product must have a name"],
  },
  description: {
    type: String,
    required: [true, "product must have a description"],
  },
  category: {
    type: String,
    enum: ["women", "men", "kid"],
    required: [true, "product must belong to category"],
  },
  image: {
    type: String,
  },
  new_price: {
    type: Number,
  },
  old_price: {
    type: Number,
  },
  large_quantity: {
    type: Number,
    default: 0,
  },
  x_large_quantity: {
    type: Number,
    default: 0,
  },
  xx_large_quantity: {
    type: Number,
    default: 0,
  },
  small_quantity: {
    type: Number,
    default: 0,
  },
  medium_quantity: {
    type: Number,
    default: 0,
  },
  crearedAt: {
    type: Date,
    default: Date.now,
  },
  soldPieces: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
  },
  numRatings: {
    type: Number,
    default: 0,
  },
  numberOfReviewers: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
