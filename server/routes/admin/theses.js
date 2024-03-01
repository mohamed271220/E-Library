const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const adminController = require('../../controllers/admin/theses');

const router = express.Router();

router.post('/', isAdmin, adminController.addThesis);
router.put('/:thesisId', isAdmin, adminController.editThesis);
router.delete('/:thesisId', isAdmin, adminController.deleteThesis);

module.exports = router;