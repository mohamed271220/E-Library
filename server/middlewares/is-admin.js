const jwt = require("jsonwebtoken");
const User = require("../models/user"); // assuming the User model is in this path

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    next(error);
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    next(error);
  }

  try {
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 422;
      return next(error);
    }
    if (user.role !== 'admin') {
      const error = new Error("User not authorized to make this request");
      error.statusCode = 403; // 403 is more appropriate for authorization issues
      return next(error);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }

  req.userId = decodedToken.userId;
  next();
};