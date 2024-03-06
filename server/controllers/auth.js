const User = require("../models/user");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId, "-password")
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "User fetched",
      user: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};

// SIGNUP
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const image = req.body.image;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
  if (existingUser) {
    const error = new Error("User exists already");
    error.statusCode = 422;
    return next(error);
  }
  let hashedPassword;
  hashedPassword = await bcrypt.hash(password, 12);
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: image,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new Error("Signup failed");
    error.statusCode = 500;
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id.toString(),
        email: createdUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
  res.status(201).json({
    message: "User created",
    token: token,
    userId: createdUser.id,
    image: createdUser.image,
    role: createdUser.role,
    name: createdUser.name,
  });
};

// USER LOGIN
exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    // console.log(existingUser);
  } catch (err) {
    const error = new Error("Login failed");
    error.statusCode = 500;
    return next(error);
  }
  if (!existingUser) {
    const error = new Error(
      "User not found please make sure your credentials are right"
    );
    error.statusCode = 404;
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new Error("Login failed");
    error.statusCode = 500;
    return next(error);
  }

  if (!isValidPassword) {
    const error = new Error("Invalid Password");
    error.statusCode = 401;
    return next(error);
  }

  let accessToken;
  try {
    accessToken = jwt.sign(
      { userId: existingUser.id.toString(), email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send authorization roles and access token to user
    res.json({
      message: "User logged in",
      token: accessToken,
      userId: existingUser.id,
      image: existingUser.image,
      role: existingUser.role,
      name: existingUser.name,
    });
  } catch (err) {
    const error = new Error("Login failed");
    error.statusCode = 500;
    return next(error);
  }
};
