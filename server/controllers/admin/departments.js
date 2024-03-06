const Department = require('../../models/Category');

const { validationResult } = require('express-validator');

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
