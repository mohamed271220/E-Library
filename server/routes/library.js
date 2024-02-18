const router = require("express").Router();
const libraryController = require("../controllers/library");

router.get("/all", libraryController.getBooks);
router.get("/:bookId", libraryController.getBook);
router.get("/search", libraryController.searchBooks);

router.get("/departments", libraryController.getDepartments);
router.get("/departments/:departmentId", libraryController.getDepartment);

router.get("/subjects", libraryController.getSubjects);
router.get("/subjects/:subjectId", libraryController.getSubject);

module.exports = router;