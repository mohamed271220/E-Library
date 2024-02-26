const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const journalsController = require('../../controllers/admin/journals');

const router = express.Router();

router.post('/', isAdmin, journalsController.addJournal);
router.put('/:journalId', isAdmin, journalsController.editJournal);
router.delete('/:journalId', isAdmin, journalsController.deleteJournal);
router.post('/:journalId/volumes', isAdmin, journalsController.addJournalVolumes);
router.put('/:journalId/volumes/:volumeNumber', isAdmin, journalsController.editJournalVolume);
router.delete('/:journalId/volumes/:volumeNumber', isAdmin, journalsController.deleteJournalVolume);


module.exports = router;