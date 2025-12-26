const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { createOrder, verityPayment, webHookVerification } = require("../controllers/paymentController");
const router = express.Router();

router.route("/create-order").post(isVerifiedUser, createOrder);
router.route("/verify-payment").post(isVerifiedUser, verityPayment);
router.route("/webhook-verification").post(isVerifiedUser, webHookVerification);

module.exports = router;
