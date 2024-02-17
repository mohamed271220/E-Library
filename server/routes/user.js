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
router.get('/borrowedBooks', isUser, userController.getBorrowedBooks);
router.post('/borrowedBooks', isUser, userController.addToBorrowedBooks);
router.delete('/borrowedBooks', isUser, userController.deleteBorrowedBooks);
router.get('/read/:bookId', isUser, userController.readBook);

module.exports = router;