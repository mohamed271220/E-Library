const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const adminController = require('../../controllers/admin');

const router = express.Router();

router.post('/', isAdmin, adminController.addEncyclopedia);
router.put('/:encyclopediaId', isAdmin, adminController.editEncyclopedia);
router.delete('/:encyclopediaId', isAdmin, adminController.deleteEncyclopedia);
router.post('/:encyclopediaId/volumes', isAdmin, adminController.addEncyclopediaVolumes);
router.put('/:encyclopediaId/volumes/:volumeNumber', isAdmin, adminController.editEncyclopediaVolume);
router.delete('/:encyclopediaId/volumes/:volumeNumber', isAdmin, adminController.deleteEncyclopediaVolume);


module.exports = router;