const createHttpError = require("http-errors");
const Order = require("../models/orderModel");
const { default: mongoose } = require("mongoose");

const addOrder = async (req, res, next) => {
  try {
    console.log("Adding new order with data:", req.body);
    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created !",
      data: order,
    });
  } catch (error) {
    console.error("Error adding order:", error);
    return next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(400, "Invalid order ID !");
      return next(error);
    }

    const order = await Order.findById(id);

    if (!order) {
      const error = createHttpError(404, "Order not found !");
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("table");
    res.status(200).json({ data: orders });
  } catch (error) {
    return next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(400, "Invalid order ID !");
      return next(error);
    }

    console.log("Updating order:", id, "with status:", orderStatus);

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      const error = createHttpError(404, "Order not found !");
      return next(error);
    }

    res
      .status(200)
      .json({ success: true, message: "Order updated !", data: order });
  } catch (error) {
    return next(error);
  }
};

module.exports = { addOrder, getOrderById, getOrders, updateOrder };
