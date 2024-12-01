const express = require("express");
const orderConroller = require("../controllers/order");
const { protect, isNormalUser } = require("../controllers/auth.js");

const router = express.Router();

router.use(protect);

router.post(
  "/",
  orderConroller.checkProductsAvailability,
  orderConroller.creatOrder
);

router.get("/myOrders", orderConroller.getCustomerOrders);
router.get("/:id", orderConroller.getOrder);

module.exports = router;
