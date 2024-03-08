const User = require('../../models/user');
const mongoose = require('mongoose');

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
            user.role = "admin";
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
