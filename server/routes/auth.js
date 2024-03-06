const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const isUser = require("../middlewares/is-auth");
const router = express.Router();

router.get("/user/:id", isUser, authController.getUser);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  authController.login
);

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

module.exports = router;
