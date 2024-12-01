const express = require("express");
const {
  createReview,
  deleteReview,
  getReview,
  updateReview,
  isReviewOwner,
  getProductReviews,
} = require("../controllers/review.js");
const { protect, isNormalUser } = require("../controllers/auth.js");

const rounter = express.Router();

rounter.get("/:id", getReview);

rounter.get("/productReviews/:productId", getProductReviews);

rounter.use(protect);

rounter.post("/", createReview);

rounter.patch("/:id", isReviewOwner, updateReview);

rounter.delete("/:id", isReviewOwner, deleteReview);

module.exports = rounter;
