const User = require('../models/user');
const Book = require('../models/book');
const Department = require('../models/department');
const SubjectCode = require('../models/subjectCode');
const Event = require('../models/event');
const Post = require('../models/post');

const { validationResult } = require('express-validator');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}
exports.makeUserAdmin = async (req, res, next) => {
    try {
        if (req.userId) {
            const user = await User.findById(req.params.id);
            user.role = admin
            await user.save();
            return res.status(200).json({ message: "User made admin successfully" });
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        if (req.userId) {
            const user = await User.findById(req.params.id);
            await user.remove();
            return res.status(200).json({ message: "User deleted successfully" });
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return;
    }
}
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
        await book.save();
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
            throw new Error('Book not found');
        }

        const { title, author, description, image, code, departmentId } = req.body;
        if (title) book.title = title;
        if (author) book.author = author;
        if (description) book.description = description;
        if (image) book.image = image;
        if (code) book.code = code;
        if (departmentId) book.department = departmentId;

        await book.save();

        res.status(200).json({ book });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.deleteBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        await book.remove();
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
        const { publicationDate, changes, pdfLink } = req.body;
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        const edition = book.editions.find(edition => edition.editionNumber === editionNumber);
        if (!edition) {
            throw new Error('Edition not found');
        }
        if (publicationDate) edition.publicationDate = publicationDate;
        if (changes) edition.changes = changes;
        if (pdfLink) edition.pdfLink = pdfLink;
        await book.save();
        res.status(200).json({ message: "Book edition edited successfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return;
    }
}

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
exports.addPost = async (req, res, next) => {
    try {
        if (req.userId) {
            // console.log(req.user);
            const user = await User.findById(req.userId).select("-password");

            if (!user) {
                const error = new Error("User not found");
                error.statusCode = 404;
                next(error);
            }
            if (user.role === "user") {
                const error = new Error("You are not authorized to post");
                error.statusCode = 404;
                next(error);
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const postedBy = user.username;

            const { title, author, image, tag, body } = req.body;

            const post = new Post({
                title,
                author,
                image,
                tag,
                body: JSON.parse(body),
                postedBy
            });
            await post.save();
            res.status(201).json({ message: "Post created successfully", post });

        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.editPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { postId } = req.params;
        const { title, author, image, tag, body } = req.body;
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        if (title) post.title = title;
        if (author) post.author = author;
        if (image) post.image = image;
        if (tag) post.tag = tag;
        if (body) post.body = JSON.parse(body);
        await post.save();
        res.status(200).json({ message: "Post edited successfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        await post.remove();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.addDepartment = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name } = req.body;
        const department = new Department({ name });
        await department.save();
        res.status(201).json({ message: "Department created successfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.editDepartment = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { departmentId } = req.params;
        const { name } = req.body;
        const department = await Department.findById(departmentId);
        if (!department) {
            throw new Error('Department not found');
        }
        if (name) department.name = name;
        await department.save();
        res.status(200).json({ message: "Department edited successfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.deleteDepartment = async (req, res, next) => {
    try {
        const { departmentId } = req.params;
        const department = await Department.findById(departmentId);
        if (!department) {
            throw new Error('Department not found');
        }
        await department.remove();
        res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}