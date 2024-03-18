//TODO: get profile
//TODO: edit profile
//TODO: add to borrowedBooks
//TODO: remove from borrowedBooks
//TODO: get borrowedBooks

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isUser = require('../middlewares/is-auth');

router.get('/profile', isUser, userController.getProfile);
router.post('/profile', isUser, userController.postProfile);
router.post('/add-to-saved-books/:id', isUser, userController.addToSavedBooks);
router.post('/remove-from-saved-books/:id', isUser, userController.removeFromSavedBooks);
router.post('/add-to-saved-journals/:id', isUser, userController.addToSavedJournals);
router.delete('/remove-from-saved-journals/:id', isUser, userController.removeFromSavedJournals);
router.post('/add-to-saved-encyclopedias/:id', isUser, userController.addToSavedEncyclopedias);
router.delete('/remove-from-saved-encyclopedias/:id', isUser, userController.removeFromSavedEncyclopedias);
router.post('/add-to-saved-researches/:id', isUser, userController.addToSavedResearches);
router.delete('/remove-from-saved-researches/:id', isUser, userController.removeFromSavedResearches);
router.post('/add-to-saved-theses/:id', isUser, userController.addToSavedTheses);
router.delete('/remove-from-saved-theses/:id', isUser, userController.removeFromSavedTheses);


module.exports = router;