const mongoose = require("mongoose");
const Product = require("./Product");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    trim: true,
  },
  crearedAt: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    required: [true, "please provide your rating"],
    min: [1, "minimum rating is 1"],
    max: [5, "max rating is 5"],
  },
  reviewee: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "please provide the reviewee id"],
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "please provide the Product id"],
  },
});

reviewSchema.statics.clacRating = async function (propId) {
  const results = await this.aggregate([
    {
      $match: { productId: propId },
    },
    {
      $group: {
        _id: "$productId",
        numRating: { $sum: 1 },
        numReviewers: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (results.length > 0) {
    const rating = Math.round(results[0].avgRating);

    await Product.findByIdAndUpdate(
      propId,
      {
        numRatings: results[0].numRating,
        rating: rating,
        numberOfReviewers: results[0].numReviewers,
      },
      { new: true }
    );
  } else {
    await Product.findByIdAndUpdate(
      propId,
      {
        numRatings: 0,
        rating: 1,
        numberOfReviewers: 0,
      },
      { new: true }
    );
  }
};

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "reviewee", select: "name" });
  next();
});

reviewSchema.post("save", function (data) {
  this.constructor.clacRating(this.productId);
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "reviewee", select: "name" });
  next();
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.reviewQuery = await this.model.findOne(this.getQuery());
  next();
});

// reviewSchema.index({ productId: 1, reviewee: 1 });

module.exports = mongoose.model("Review", reviewSchema);
