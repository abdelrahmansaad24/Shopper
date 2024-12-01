const express = require("express");
const productConroller = require("../controllers/product");

const router = express.Router();

router.get("/", productConroller.getProducts);
router.get("/count", productConroller.countProducts);
router.get("/latestCollection", productConroller.getLatestCollection);
router.get("/popularInWomen", productConroller.getPopularInWomen);
router.get("/:id", productConroller.getProduct);

module.exports = router;
