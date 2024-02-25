const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const adminController = require('../../controllers/admin');

const router = express.Router();


router.post('/', isAdmin, adminController.addResearch);
router.put('/:researchId', isAdmin, adminController.editResearch);
router.delete('/:researchId', isAdmin, adminController.deleteResearch);

module.exports = router;