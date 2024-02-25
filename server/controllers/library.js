/* //TODO :
get all books
with filters (indicated by query parameters)
(like max , department, semester, subject code, author
search by title
search by author
search by subject code)

*/
//TODO : get a book

const Book = require("../models/book");
const Department = require("../models/department");
const Subject = require("../models/subjectCode");

exports.getBooks = async (req, res) => {
    const { page = 1, limit = 10, department, semester, subjectCode, author, title } = req.query;
    try {
        let filter = {};

        if (department) {
            filter.department = department;
        }

        if (semester) {
            filter.semester = semester;
        }

        if (subjectCode) {
            filter.subjectCode = subjectCode;
        }

        if (author) {
            filter.author = author;
        }

        if (title) {
            filter.title = title;
        }

        const books = await Book.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        // get total documents in the Book collection 
        const count = await Book.countDocuments(filter);

        // return response with books, total pages, and current page
        res.json({
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

exports.getBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        let book = await Book.findById(bookId).select('-editions');
        res.status(200).json({ book });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.searchBooks = async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    try {
        let books = await Book.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } },
                { code: { $regex: search, $options: "i" } }
            ]
        }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        // get total documents in the Book collection 
        const count = await Book.countDocuments();

        // return response with books, total pages, and current page
        res.json({
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

exports.getDepartments = async (req, res, next) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ departments });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.getDepartment = async (req, res, next) => {
    try {
        const { departmentId } = req.params;
        const department = await Department.findById(departmentId);
        res.status(200).json({ department });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


