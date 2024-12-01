const catchAsync = require("../utils/catchAsync");
const Product = require("../models/Product");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    next(new AppError("No product found with that ID", 404));
  }
  return res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.getProducts = catchAsync(async (req, res) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const product = Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.countProducts = catchAsync(async (req, res, next) => {
  const count = await Product.countDocuments({ category: req.query.category });
  res.status(200).json({
    status: "success",
    count,
  });
});

exports.getLatestCollection = catchAsync(async (req, res, next) => {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  let query = {
    createdAt: { $gte: twoWeeksAgo },
  };

  let queryString = { ...req.query };

  if (req.query.category) {
    let categories = req.query.category.split(",");
    query = { ...query, category: { $in: categories } };
    delete queryString["category"];
  }

  const features = new APIFeatures(Product.find(query), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getPopularInWomen = catchAsync(async (req, res, next) => {
  const products = await Product.find({ category: "women" })
    .sort("-soldPieces")
    .limit(7);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});
