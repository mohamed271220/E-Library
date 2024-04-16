const Book = require('../../models/book');
const Category = require('../../models/Category');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

exports.addBook = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const { title, author, description, image, category } = req.body;
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        const book = new Book({
            title,
            author,
            description,
            image,
            category
        });
        if (category) {
            const categoryDb = await Category.findById(category);
            categoryDb.books.push(book);
            await categoryDb.save(sess);
        }
        await book.save(sess);
        await sess.commitTransaction();
        sess.endSession();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.editBookInfo = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const fieldsToUpdate = ['title', 'author', 'description', 'image', 'departmentId'];
        fieldsToUpdate.forEach(field => {
            if (req.body[field]) book[field] = req.body[field];
        });

        await book.save();
        res.status(200).json({ book });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const sess = await mongoose.startSession();
        await sess.startTransaction();
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        if (book.category) {
            const category = await Category.findById(book.category);
            category.books.pull(book);
            await category.save(sess);
        }
        await Book.deleteOne({ _id: book._id }, { session: sess });
        await sess.commitTransaction();
        sess.endSession();
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return;
    }
}

exports.addBookEditions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    try {
        const { bookId } = req.params;
        const { editionNumber, publicationDate, changes, pdfLink } = req.body;
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        book.editions.push({
            editionNumber,
            publicationDate,
            changes,
            pdfLink
        });
        await book.save();
        res.status(200).json({ message: "Book edition added successfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return;
    }
}

exports.editBookEdition = async (req, res, next) => {
    try {
        const { bookId, editionNumber } = req.params;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        const edition = book.editions.find(edition => edition.id === editionNumber);
        if (!edition) {
            console.log(editionNumber);
            return res.status(404).json({ message: "Edition not found" });
        }

        const fieldsToUpdate = ['publicationDate', 'changes', 'pdfLink'];
        fieldsToUpdate.forEach(field => {
            if (req.body[field]) edition[field] = req.body[field];
        });

        await book.save();
        res.status(200).json({ message: "Book edition edited successfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteBookEdition = async (req, res, next) => {
    try {
        const { bookId, editionNumber } = req.params;
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        const index = book.editions.findIndex(edition => edition.id === editionNumber);
        if (index === -1) {
            throw new Error('Edition not found');
        }
        book.editions.splice(index, 1);
        await book.save();
        res.status(200).json({ message: "Book edition deleted successfully" });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return;
    }
}
