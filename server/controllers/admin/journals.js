const Journal = require('../../models/journal');

const { validationResult } = require('express-validator');

exports.addJournal = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, publisher, ISSN, subject, image } = req.body;
        const journal = new Journal({ title, publisher, ISSN, subject, image });
        await journal.save();
        res.status(201).json({ message: "Journal created successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}
exports.editJournal = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const journal = await Journal.findById(req.params.journalId);
        if (!journal) {
            return res.status(404).json({ message: "Journal not found" });
        }
        const fieldsToUpdate = ['title', 'publisher', 'ISSN', 'subject', 'image'];
        fieldsToUpdate.forEach(field => {
            if (req.body[field]) journal[field] = req.body[field];
        });
        await journal.save();
        res.status(200).json({ message: "Journal edited successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}
exports.deleteJournal = async (req, res, next) => {
    try {
        const { journalId } = req.params;
        const journal = await Journal.findById(journalId);
        if (!journal) {
            throw new Error('Journal not found');
        }
        await Journal.findByIdAndDelete(journalId);
        res.status(200).json({ message: "Journal deleted successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}
exports.addJournalVolumes = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { journalId } = req.params;
        const { volumeNumber, publicationYear, pdfLink } = req.body;
        const journal = await Journal.findById(journalId);
        if (!journal) {
            throw new Error('Journal not found');
        }
        journal.volumes.push({ volumeNumber, publicationYear, pdfLink });
        await journal.save();
        res.status(201).json({ message: "Journal volume created successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}
exports.editJournalVolume = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { journalId, volumeNumber } = req.params;
        const { publicationYear, pdfLink } = req.body;
        const journal = await Journal.findById(journalId);
        if (!journal) {
            throw new Error('Journal not found');
        }
        const volume = journal.volumes.find(volume => volume.id === volumeNumber);
        if (!volume) {
            throw new Error('Volume not found');
        }
        const fieldsToUpdate = ['publicationYear', 'pdfLink'];
        fieldsToUpdate.forEach(field => {
            if (req.body[field]) volume[field] = req.body[field]
        })
        await journal.save();
        res.status(200).json({ message: "Journal volume edited successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}
exports.deleteJournalVolume = async (req, res, next) => {
    try {
        const { journalId, volumeNumber } = req.params;
        const journal = await Journal.findById(journalId);
        if (!journal) {
            throw new Error('Journal not found');
        }
        const index = journal.volumes.findIndex(volume => volume.id === volumeNumber);
        if (index === -1) {
            throw new Error('Volume not found');
        }
        journal.volumes.splice(index, 1);
        await journal.save();
        res.status(200).json({ message: "Journal volume deleted successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}