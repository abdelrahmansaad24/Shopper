const catchAsync = require("../utils/catchAsync");
const Product = require("../models/Product.js");
const AppError = require("../utils/appError");
const Order = require("../models/Order");

exports.checkProductsAvailability = async (req, res, next) => {
  const products = req.body.products;
  for (const productId of Object.keys(products)) {
    let prod = await Product.findById(productId);
    if (!prod) {
      return next(new AppError("Error in product ID", 404));
    }
    let productSizes = products[productId];

    for (const size of Object.keys(productSizes)) {
      if (prod[size] < productSizes[size]) {
        return next(
          new AppError(
            `Not enough products in ${productId} of size ${size}`,
            404
          )
        );
      }
    }
  }
  next();
};

exports.creatOrder = catchAsync(async (req, res, next) => {
  const products = req.body.products;
  let price = 0;

  for (const productId of Object.keys(products)) {
    let prod = await Product.findById(productId);
    if (!prod) {
      return next(new AppError("Error in product ID", 404));
    }

    let productSizes = products[productId];

    for (const size of Object.keys(productSizes)) {
      if (prod[size] < productSizes[size]) {
        return next(
          new AppError(
            `Not enough products in ${productId} of size ${size}`,
            404
          )
        );
      }
      prod[size] -= productSizes[size];
      prod.soldPieces += productSizes[size];
      price += productSizes[size] * prod.new_price;
    }

    await Product.findByIdAndUpdate(productId, prod, {
      new: true,
      runValidators: true,
    });
  }

  const order = await Order.create({
    ...req.body,
    total_price: price,
    customerId: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.getCustomerOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ customerId: req.user._id });
  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError("This order does not exist", 404));
  const orderProducts = order.products;
  for (let productId of Object.keys(orderProducts)) {
    const prod = await Product.findById(productId);
    orderProducts[productId] = { ...orderProducts[productId], details: prod };
  }
  res.status(200).json({
    status: "success",
    data: order,
  });
});
