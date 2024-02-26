const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const booksController = require('../../controllers/admin/books');

const router = express.Router();

router.post('/', isAdmin, booksController.addBook);
router.put('/:bookId', isAdmin, booksController.editBookInfo);
router.delete('/:bookId', isAdmin, booksController.deleteBook);
router.post('/:bookId/editions', isAdmin, booksController.addBookEditions);
router.put('/:bookId/editions/:editionNumber', isAdmin, booksController.editBookEdition);
router.delete('/:bookId/editions/:editionNumber', isAdmin, booksController.deleteBookEdition);


module.exports = router;