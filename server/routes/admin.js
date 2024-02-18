
const isAdmin = require('../middlewares/is-admin');
const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/users', isAdmin, adminController.getUsers);
router.put('/users/:userId', isAdmin, adminController.makeUserAdmin);
router.delete('/users/:userId', isAdmin, adminController.deleteUser);

router.post('/books', isAdmin, adminController.addBook);
router.put('/books/:bookId', isAdmin, adminController.editBookInfo);
router.delete('/books/:bookId', isAdmin, adminController.deleteBook);

router.post('/books/:bookId/editions', isAdmin, adminController.addBookEditions);
router.put('/books/:bookId/editions/:editionNumber', isAdmin, adminController.editBookEdition);
router.delete('/books/:bookId/editions/:editionNumber', isAdmin, adminController.deleteBookEdition);

router.post('/posts', isAdmin, adminController.addPost);
router.put('/posts/:postId', isAdmin, adminController.editPost);
router.delete('/posts/:postId', isAdmin, adminController.deletePost);

router.post('/departments', isAdmin, adminController.addDepartment);
router.put('/departments/:departmentId', isAdmin, adminController.editDepartment);
router.delete('/departments/:departmentId', isAdmin, adminController.deleteDepartment);

router.post('/subjects', isAdmin, adminController.addSubject);
router.put('/subjects/:subjectId', isAdmin, adminController.editSubject);
router.delete('/subjects/:subjectId', isAdmin, adminController.deleteSubject);

router.post('/events', isAdmin, adminController.addEvent);
router.put('/events/:eventId', isAdmin, adminController.editEvent);
router.delete('/events/:eventId', isAdmin, adminController.deleteEvent);

module.exports = router;