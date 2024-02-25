const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const adminController = require('../../controllers/admin');

const router = express.Router();

router.post('/', isAdmin, adminController.addBook);
router.put('/:bookId', isAdmin, adminController.editBookInfo);
router.delete('/:bookId', isAdmin, adminController.deleteBook);
router.post('/:bookId/editions', isAdmin, adminController.addBookEditions);
router.put('/:bookId/editions/:editionNumber', isAdmin, adminController.editBookEdition);
router.delete('/:bookId/editions/:editionNumber', isAdmin, adminController.deleteBookEdition);


module.exports = router;