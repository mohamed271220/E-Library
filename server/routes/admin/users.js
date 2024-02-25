const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const adminController = require('../../controllers/admin');

const router = express.Router();

router.get('/', isAdmin, adminController.getUsers);
router.put('/:userId', isAdmin, adminController.makeUserAdmin);
router.delete('/:userId', isAdmin, adminController.deleteUser);

module.exports = router;