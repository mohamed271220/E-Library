const router = require("express").Router();
const libraryController = require("../controllers/library");

router.get("/books", libraryController.getBooks);
router.get("/books/:bookId", libraryController.getBook);
router.get("/books/search", libraryController.searchBooks);

router.get("/departments", libraryController.getDepartments);
router.get("/departments/:departmentId", libraryController.getDepartment);

router.get("/encyclopedias", libraryController.getEncyclopedias);
router.get("/encyclopedias/:encyclopediaId", libraryController.getEncyclopedia);
router.get("/encyclopedias/search", libraryController.searchEncyclopedias);

router.get("/journals", libraryController.getJournals);
router.get("/journals/:journalId", libraryController.getJournal);
router.get("/journals/search", libraryController.searchJournals);

router.get("/researches", libraryController.getResearches);
router.get("/researches/:researchId", libraryController.getResearch);
router.get("/researches/search", libraryController.searchResearches);

router.get("/theses", libraryController.getTheses);
router.get("/theses/:thesisId", libraryController.getThesis);
router.get("/theses/search", libraryController.searchTheses);

module.exports = router;