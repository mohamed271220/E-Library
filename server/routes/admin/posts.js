const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const adminController = require('../../controllers/admin');

const router = express.Router();


router.post('/', isAdmin, adminController.addPost);
router.put('/:postId', isAdmin, adminController.editPost);
router.delete('/:postId', isAdmin, adminController.deletePost);

module.exports = router;