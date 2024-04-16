const Encyclopedia = require('../../models/encyclopedia');

const { validationResult } = require('express-validator');

exports.addEncyclopedia = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, publisher, ISBN, subject, image } = req.body;
        const encyclopedia = new Encyclopedia({ title, publisher, ISBN, subject, image });
        await encyclopedia.save();
        res.status(201).json({ message: "Encyclopedia created successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}

exports.editEncyclopedia = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const encyclopedia = await Encyclopedia.findById(req.params.encyclopediaId);
        if (!encyclopedia) {
            return res.status(404).json({ message: "Encyclopedia not found" });
        }

        const fieldsToUpdate = ['title', 'publisher', 'ISBN', 'subject', 'image'];
        fieldsToUpdate.forEach(field => {
            if (req.body[field]) encyclopedia[field] = req.body[field];
        });
        await encyclopedia.save();
        res.status(200).json({ message: "Encyclopedia edited successfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteEncyclopedia = async (req, res, next) => {
    try {
        const { encyclopediaId } = req.params;
        const encyclopedia = await Encyclopedia.findById(encyclopediaId);
        if (!encyclopedia) {
            throw new Error('Encyclopedia not found');
        }
        await Encyclopedia.deleteOne({ _id: encyclopediaId });
        res.status(200).json({ message: "Encyclopedia deleted successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}

exports.addEncyclopediaVolumes = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { encyclopediaId } = req.params;
        const { volumeNumber, publicationYear, pdfLink } = req.body;
        const encyclopedia = await Encyclopedia.findById(encyclopediaId);
        if (!encyclopedia) {
            throw new Error('Encyclopedia not found');
        }
        encyclopedia.volumes.push({ volumeNumber, publicationYear, pdfLink });
        await encyclopedia.save();
        res.status(201).json({ message: "Encyclopedia volume created successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}

exports.editEncyclopediaVolume = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { encyclopediaId, volumeNumber } = req.params;
        const encyclopedia = await Encyclopedia.findById(encyclopediaId);
        if (!encyclopedia) {
            return res.status(404).json({ message: 'Encyclopedia not found' });
        }
        const volume = encyclopedia.volumes.find(volume => volume.id === volumeNumber);
        if (!volume) {
            return res.status(404).json({ message: 'Volume not found' });
        }

        const fieldsToUpdate = ['publicationYear', 'pdfLink'];
        fieldsToUpdate.forEach(field => {
            if (req.body[field]) volume[field] = req.body[field];
        });

        await encyclopedia.save();
        res.status(200).json({ message: "Encyclopedia volume edited successfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteEncyclopediaVolume = async (req, res, next) => {
    try {
        const { encyclopediaId, volumeNumber } = req.params;
        const encyclopedia = await Encyclopedia.findById(encyclopediaId);
        if (!encyclopedia) {
            throw new Error('Encyclopedia not found');
        }
        const index = encyclopedia.volumes.findIndex(volume => volume.id === volumeNumber);
        if (index === -1) {
            throw new Error('Volume not found');
        }
        encyclopedia.volumes.splice(index, 1);
        await encyclopedia.save();
        res.status(200).json({ message: "Encyclopedia volume deleted successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}
