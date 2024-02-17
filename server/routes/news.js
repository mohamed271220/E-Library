const express = require("express");
const newsController = require("../controllers/news");
const router = express.Router();

router.get("/all", newsController.getPosts)
router.get("/:postId", newsController.getPost)
router.getEvents("/events", newsController.getEvents)
module.exports = router;