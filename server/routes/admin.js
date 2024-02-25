const express = require('express');
const router = express.Router();

router.use('/users', require('./admin/users'));
router.use('/books', require('./admin/books'));
router.use('/posts', require('./admin/posts'));
router.use('/departments', require('./admin/departments'));
router.use('/encyclopedias', require('./admin/encyclopedias'));
router.use('/journals',require('./admin/journals'));
router.use('/researches',require('./admin/researches'));
router.use('/theses',require('./admin/theses'));

module.exports = router;