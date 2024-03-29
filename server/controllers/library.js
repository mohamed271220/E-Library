const Book = require("../models/book");
const Category = require("../models/Category");
const Encyclopedia = require("../models/encyclopedia");
const Journal = require("../models/journal");
const Research = require("../models/research");
const Thesis = require("../models/thesis");


exports.getBook = async (req, res, next) => {
    const { bookId } = req.params;
    try {
        let book = await Book.findById(bookId);
        res.status(200).json({ book });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


exports.getBooks = async (req, res, next) => {
    const { page = 1, limit = 10, category, search } = req.query;
    try {
        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } },
            ];
        }

        const books = await Book.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        // get total documents in the Book collection 
        const count = await Book.countDocuments(filter);

        // return response with books, total pages, and current page
        res.status(200).json({
            books,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.getCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        res.status(200).json({ category });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.getEncyclopedias = async (req, res, next) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;

        let query;
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { publisher: { $regex: search, $options: "i" } },
                    { subject: { $regex: search, $options: "i" } },
                ]
            };
        }
        const encyclopedias = await Encyclopedia.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Encyclopedia.countDocuments(query);

        res.status(200).json({
            encyclopedias,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.getEncyclopedia = async (req, res, next) => {
    try {
        const { encyclopediaId } = req.params;
        const encyclopedia = await Encyclopedia.findById(encyclopediaId);
        res.status(200).json({ encyclopedia });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.getJournals = async (req, res, next) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;

        let query;
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { publisher: { $regex: search, $options: "i" } },
                    { subject: { $regex: search, $options: "i" } },
                ]
            };
        }

        const journals = await Journal.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Journal.countDocuments(query);

        res.status(200).json({
            journals,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.getJournal = async (req, res, next) => {
    try {
        const { journalId } = req.params;
        const journal = await Journal.findById(journalId);
        res.status(200).json({ journal });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getResearches = async (req, res, next) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;

        let query;
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { author: { $regex: search, $options: "i" } },
                    { specialization: { $regex: search, $options: "i" } },
                    { keywords: { $in: [new RegExp(search, "i")] } }
                ]
            };
        }

        const researches = await Research.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Research.countDocuments(query);

        res.status(200).json({
            researches,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.getResearch = async (req, res, next) => {
    try {
        const { researchId } = req.params;
        const research = await Research.findById(researchId);
        res.status(200).json({ research });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getTheses = async (req, res, next) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;

        let query;
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { author: { $regex: search, $options: "i" } },
                    { university: { $regex: search, $options: "i" } },
                    { keywords: { $in: [new RegExp(search, "i")] } },
                ]
            };
        }

        const theses = await Thesis.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Thesis.countDocuments(query);

        res.status(200).json({
            theses,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.getThesis = async (req, res, next) => {
    try {
        const { thesisId } = req.params;
        const thesis = await Thesis.findById(thesisId);
        res.status(200).json({ thesis });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
