const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

const User = require("../models/userModel");

const ApiError = require("../utils/apiError");
const createToken = require("../utils/createToken");

exports.signup = asyncHandler(async (req, res, next) => {

    const password = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
    });

    const token = createToken(user._id);

    res
        .cookie("access_token", token, { httpOnly: true })
        .status(201).json({ data: user });
});

exports.login = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError("Incorrect email or password", 401));
    }
    const token = createToken(user._id);

    // Delete password from response
    delete user._doc.password;
    res
        .cookie("access_token", token, { httpOnly: true })
        .status(200).json({ data: user });
});

exports.protect = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(new ApiError('Authentication required', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return next(new ApiError('Invalid user', 401));
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error); // Log the error for debugging
        return next(new ApiError('Invalid token', 401));
    }
};

exports.allowedTo = (...roles) =>
    asyncHandler(async (req, res, next) => {
        if (!req.user || !req.user.role) {
            return next(new ApiError('Authentication required', 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ApiError('You are not allowed to access this route', 403));
        }

        next();
});