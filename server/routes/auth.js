const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const fileUpload = require("../middleware/file-upload");
const isUser = require("../middleware/is-auth");
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
  fileUpload.array("images", 1),
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

module.exports = router;
