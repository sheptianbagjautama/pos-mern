const createHttpError = require("http-errors");
const User = require("../models/userModel");

const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;

    //Validate input fields
    if (!name || !phone || !email || !password || !role) {
      const error = createHttpError(400, "All fields are required!");
      return next(error);
    }

    //Check if user already exists
    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      const error = createHttpError(
        400,
        "User already exists with this email!"
      );
      return next(error);
    }

    //Create new user
    const user = { name, phone, email, password, role };
    const newUser = User(user);
    await newUser.save();

    //Response
    res.status(201).json({
      success: true,
      message: "New user created!",
      data: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {};

module.exports = { register, login };
