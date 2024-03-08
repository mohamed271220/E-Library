const Category = require('../../models/Category');

const { validationResult } = require('express-validator');

exports.addCategory = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json({ message: "Category created successfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.editCategory = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { categoryId } = req.params;
        const { name } = req.body;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        if (name) category.name = name;
        await category.save();
        res.status(200).json({ message: "Category edited successfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        await category.remove();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
