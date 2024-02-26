const Research = require("../../models/research");

const { validationResult } = require('express-validator');

exports.addResearch = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {
            title,
            author,
            year,
            abstract,
            image,
            pdfLink,
            specialization,
            keywords,
            citations,
            doi
        } = req.body;
        const research = new Research({
            title,
            author,
            year,
            abstract,
            image,
            pdfLink,
            specialization,
            keywords,
            citations,
            doi
        });
        await research.save();
        res.status(201).json({ message: 'Research added successfully!' });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.editResearch = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { researchId } = req.params;
        const research = await Research.findById(researchId);
        if (!research) {
            throw new Error('Research not found');
        }
        const fieldsToUpdate = [
            'title',
            'author',
            'year',
            'abstract',
            'image',
            'pdfLink',
            'specialization',
            'keywords',
            'citations',
            'doi',
        ];
        fieldsToUpdate.forEach(field => {
            if (req.body[field]) research[field] = req.body[field];
        });
        await research.save();
        res.status(200).json({ message: "Research edited successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteResearch = async (req, res, next) => {
    try {
        const { researchId } = req.params;
        const research = await Research.findById(researchId);
        if (!research) {
            throw new Error('Research not found');
        }
        await research.remove();
        res.status(200).json({ message: "Research deleted successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
