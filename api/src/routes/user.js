const express = require("express");
const userConroller = require("../controllers/User.js");
const { protect, isNormalUser } = require("../controllers/auth.js");

const router = express.Router();

router.use(protect);

router.get("/myProfile", userConroller.getMyPersonalInfo);
router.post("/myProfile", userConroller.updateMe);
module.exports = router;
