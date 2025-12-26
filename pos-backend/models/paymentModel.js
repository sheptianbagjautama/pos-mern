const mongoose = require("mongoose");
const { create } = require("./userModel");

const paymentSchema = new mongoose.Schema({
  paymentId: String,
  orderId: String,
  amount: Number,
  currency: String,
  status: String,
  method: String,
  email: String,
  contact: String,
  createdAt: Date,
});

const payment = mongoose.model("Payment", paymentSchema);
module.exports = payment;
