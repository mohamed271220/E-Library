const router = require("express").Router();
const libraryController = require("../controllers/library");

router.get("/all", libraryController.getBooks);
router.get("/:bookId", libraryController.getBook);
router.get("/search", libraryController.searchBooks);

module.exports = router;