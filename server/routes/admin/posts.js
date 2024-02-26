const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const postsController = require('../../controllers/admin/posts');

const router = express.Router();

router.post('/', isAdmin, postsController.addPost);
router.put('/:postId', isAdmin, postsController.editPost);
router.delete('/:postId', isAdmin, postsController.deletePost);

module.exports = router;