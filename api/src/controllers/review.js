const catchAsync = require("../utils/catchAsync");
const Review = require("../models/Review");
const AppError = require("../utils/appError.js");
const Product = require("../models/Product.js");

exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create({ ...req.body, reviewee: req.user._id });
  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!review) {
    return next(new AppError("No review found with this id", 404));
  }
  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return next(new AppError("No review found with this id", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError("No review found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.getProductReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ productId: req.params.productId });
  if (!reviews) {
    return next(new AppError("No reviews for this hotel", 404));
  }
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.isReviewOwner = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id).select("reviewee");
  if (!review) {
    return next(new AppError("No review with this id", 404));
  }
  if (review.reviewee._id.toString() === req.user._id.toString()) {
    next();
  } else {
    return next(
      new AppError("Not Authorized, you are not the owner of this review", 401)
    );
  }
});

exports.getUserReview = catchAsync(async (req, res, next) => {
  const review = await Review.find(req.query);
  if (!review) {
    return next(new AppError("No review with this id", 404));
  }
  res.status(200).json(review[0]);
});
