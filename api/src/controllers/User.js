const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getMyPersonalInfo = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select(
    "name email address phone -_id"
  );
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});
