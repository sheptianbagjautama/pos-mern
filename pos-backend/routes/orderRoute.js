const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { addOrder, getOrders, updateOrder, getOrderById } = require("../controllers/orderController");
const router = express.Router(); // Create a router instance

router.route("/").post(isVerifiedUser, addOrder); 
router.route("/").get(isVerifiedUser, getOrders);
router.route("/:id").get(isVerifiedUser, getOrderById);
router.route("/:id").put(isVerifiedUser, updateOrder);

module.exports = router;