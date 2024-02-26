const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const encyclopediasController = require('../../controllers/admin/encyclopedias');

const router = express.Router();

router.post('/', isAdmin, encyclopediasController.addEncyclopedia);
router.put('/:encyclopediaId', isAdmin, encyclopediasController.editEncyclopedia);
router.delete('/:encyclopediaId', isAdmin, encyclopediasController.deleteEncyclopedia);
router.post('/:encyclopediaId/volumes', isAdmin, encyclopediasController.addEncyclopediaVolumes);
router.put('/:encyclopediaId/volumes/:volumeNumber', isAdmin, encyclopediasController.editEncyclopediaVolume);
router.delete('/:encyclopediaId/volumes/:volumeNumber', isAdmin, encyclopediasController.deleteEncyclopediaVolume);


module.exports = router;