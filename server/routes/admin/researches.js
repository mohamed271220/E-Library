const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const researchesController = require('../../controllers/admin/researches');

const router = express.Router();


router.post('/', isAdmin, researchesController.addResearch);
router.put('/:researchId', isAdmin, researchesController.editResearch);
router.delete('/:researchId', isAdmin, researchesController.deleteResearch);

module.exports = router;