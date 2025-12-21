const createHttpError = require("http-errors");
const config = require("../config/config");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isVerifiedUser = async (req, res, next) => {
    try {
        const {accessToken} = req.cookies;

        if(!accessToken){
            const error = createHttpError(401, "Please provide token !");
            return next(error);
        }

        const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

        const user = await User.findById(decodeToken._id);
        if(!user) {
            const error = createHttpError(401, "User not exists !");
            return next(error);
        }

        req.user = user; //Attach user to request object
        next(); //Proceed to next middleware or route handler

    } catch (error) {
        console.log(error);
        const err = createHttpError(401, "Invalid token!");
        next(err);
    }
}

module.exports = { isVerifiedUser };