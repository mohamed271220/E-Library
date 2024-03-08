const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      return next(error);
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedToken);
    } catch (err) {
      err.statusCode = 500;
      return next(err);
    }
    if (!decodedToken) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      return next(error);
    }

    try {
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        const error = new Error("user not authorized to make this request");
        error.statusCode = 422;
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
  } catch (err) {
    next(err);
  }
};
