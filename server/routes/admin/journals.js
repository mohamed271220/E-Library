const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const adminController = require('../../controllers/admin');

const router = express.Router();


router.post('/', isAdmin, adminController.addJournal);
router.put('/:journalId', isAdmin, adminController.editJournal);
router.delete('/:journalId', isAdmin, adminController.deleteJournal);
router.post('/:journalId/volumes', isAdmin, adminController.addJournalVolumes);
router.put('/:journalId/volumes/:volumeNumber', isAdmin, adminController.editJournalVolume);
router.delete('/:journalId/volumes/:volumeNumber', isAdmin, adminController.deleteJournalVolume);


module.exports = router;