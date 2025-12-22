const createHttpError = require("http-errors");
const Table = require("../models/tableModel");
const { default: mongoose } = require("mongoose");

const addTable = async (req, res, next) => {
  try {
    const { tableNo } = req.body;

    if (!tableNo) {
      const error = createHttpError(400, "Please provide table No!");
      return next(error);
    }

    const isTablePresent = await Table.findOne({ tableNo });

    if (isTablePresent) {
      const error = createHttpError(400, "Table already exist!");
      return next(error);
    }

    const newTable = new Table({ tableNo });
    await newTable.save();

    res.status(201).json({
      success: true,
      message: "Table added !",
      data: newTable,
    });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find();
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;
    const {id} = req.params;

    if (!status) {
      const error = createHttpError(400, "Please provide table status !");
      return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(400, "Invalid table ID !");
      return next(error);
    }

    const table = await Table.findByIdAndUpdate(
      req.params.id,
      { status, currentOrder: orderId },
      { new: true }
    );

    if (!table) {
      const error = createHttperpror(404, "Table not found !");
      return next(error);
    }

    res
      .status(200)
      .json({ success: true, message: "Table updated!", data: table });
  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTables, updateTable };
