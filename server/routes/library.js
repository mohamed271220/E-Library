const router = require("express").Router();
const libraryController = require("../controllers/library");

router.get("/books", libraryController.getBooks);
router.get("/books/:bookId", libraryController.getBook);


router.get("/categories", libraryController.getCategories);
router.get("/categories/:categoryId", libraryController.getCategory);

router.get("/encyclopedias", libraryController.getEncyclopedias);
router.get("/encyclopedias/:encyclopediaId", libraryController.getEncyclopedia);

router.get("/journals", libraryController.getJournals);
router.get("/journals/:journalId", libraryController.getJournal);

router.get("/researches", libraryController.getResearches);
router.get("/researches/:researchId", libraryController.getResearch);

router.get("/theses", libraryController.getTheses);
router.get("/theses/:thesisId", libraryController.getThesis);

module.exports = router;