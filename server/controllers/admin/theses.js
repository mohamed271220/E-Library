const Thesis = require("../../models/thesis");

const { validationResult } = require('express-validator');

exports.addThesis = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {
            title,
            author,
            university,
            degree,
            department,
            year,
            abstract,
            pdfLink,
            image,
            supervisor,
            keywords,
            doi,
            citations
        } = req.body;
        const thesis = new Thesis({
            title,
            author,
            university,
            degree,
            department,
            year,
            abstract,
            pdfLink,
            image,
            supervisor,
            keywords,
            doi,
            citations
        });
        await thesis.save();
        res.status(201).json({ message: 'Thesis added successfully!' });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.editThesis = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { thesisId } = req.params;
        const thesis = await Thesis.findById(thesisId);
        if (!thesis) {
            const error = new Error('Could not find thesis.');
            error.statusCode = 404;
            throw error;
        }
        const fieldsToUpdate = [
            'title',
            'author',
            'university',
            'degree',
            'department',
            'year',
            'abstract',
            'pdfLink',
            'image',
            'supervisor',
            'keywords',
            'doi',
            'citations'
        ];
        fieldsToUpdate.forEach(field => {
            if (req.body[field]) thesis[field] = req.body[field];
        });

        await thesis.save();
        res.status(200).json({ message: "Thesis edited successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.deleteThesis = async (req, res, next) => {
    try {
        const { thesisId } = req.params;
        const thesis = await Thesis.findById(thesisId);
        if (!thesis) {
            throw new Error('Thesis not found');
        }
        await Thesis.findByIdAndDelete(thesisId);
        res.status(200).json({ message: "Thesis deleted successfully" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}