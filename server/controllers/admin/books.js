const Book = require('../../models/book');
const Department = require('../../models/department');

const { validationResult } = require('express-validator');

exports.addBook = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const { title, author, description, image, department, edition } = req.body;
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        const department = await Department.findById(department);
        if (!department) {
            const error = new Error("Department not found");
            error.statusCode = 404;
            throw error;
        }
        department.books.push(book);
        await department.save(sess);
        const book = new Book({
            title,
            author,
            description,
            image,
            department,
            edition: {
                editionNumber: edition.editionNumber,
                publicationDate: edition.publicationDate,
                changes: edition.changes,
                pdfLink: edition.pdfLink
            }
        });
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
        const department = await Department.findById(book.department);
        department.books.pull(book);
        await department.save(sess);
        await book.remove(sess);
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
        const edition = book.editions.find(edition => edition.editionNumber === editionNumber);
        if (!edition) {
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
        const index = book.editions.findIndex(edition => edition.editionNumber === editionNumber);
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
