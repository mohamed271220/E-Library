const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const usersController = require('../../controllers/admin/users');

const router = express.Router();

router.get('/', isAdmin, usersController.getUsers);
router.put('/:userId', isAdmin, usersController.makeUserAdmin);
router.delete('/:userId', isAdmin, usersController.deleteUser);

module.exports = router;