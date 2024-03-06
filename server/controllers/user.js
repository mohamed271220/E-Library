const User = require('../models/user');
const Book = require('../models/book');

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}
exports.postProfile = async (req, res, next) => {
    // to be  implemented
}
