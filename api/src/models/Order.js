const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  crearedAt: {
    type: Date,
    default: Date.now,
  },
  customerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "please provide the customer id"],
  },
  products: {
    type: Object,
    required: [true, "please provide the Products"],
  },
  total_price: {
    type: Number,
  },
});

module.exports = mongoose.model("Order", orderSchema);
