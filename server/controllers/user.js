const User = require('../models/user');
const Book = require('../models/book');
const Journal = require('../models/journal');
const Encyclopedia = require('../models/encyclopedia');
const Research = require('../models/research');
const Thesis = require('../models/thesis');

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select('-password').populate('savedBooks savedJournals savedEncyclopedias savedResearches savedTheses');
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
const handleSaveItem = async (req, res, next, Model, userField) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { id } = req.params;
        const item = await Model.findById(id);
        if (!item) {
            return res.status(404).json({ message: `${Model.modelName} not found` });
        }

        // Check if the item is already saved
        const isItemSaved = user[userField].some(savedItem => savedItem.toString() === id);
        if (isItemSaved) {
            return res.status(400).json({ message: `${Model.modelName} is already saved` });
        }

        user[userField].push(item);
        await user.save();
        res.status(200).json({ message: `${Model.modelName} saved successfully` });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return;
    }
}

const handleRemoveItem = async (req, res, next, Model, userField) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { id } = req.params;
        const item = await Model.findById(id);
        if (!item) {
            return res.status(404).json({ message: `${Model.modelName} not found` });
        }
        user[userField].pull(item);
        await user.save();
        res.status(200).json({ message: `${Model.modelName} removed successfully` });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        return;
    }
}

exports.addToSavedBooks = (req, res, next) => handleSaveItem(req, res, next, Book, 'savedBooks');
exports.removeFromSavedBooks = (req, res, next) => handleRemoveItem(req, res, next, Book, 'savedBooks');

exports.addToSavedJournals = (req, res, next) => handleSaveItem(req, res, next, Journal, 'savedJournals');
exports.removeFromSavedJournals = (req, res, next) => handleRemoveItem(req, res, next, Journal, 'savedJournals');

exports.addToSavedEncyclopedias = (req, res, next) => handleSaveItem(req, res, next, Encyclopedia, 'savedEncyclopedias');
exports.removeFromSavedEncyclopedias = (req, res, next) => handleRemoveItem(req, res, next, Encyclopedia, 'savedEncyclopedias');

exports.addToSavedResearches = (req, res, next) => handleSaveItem(req, res, next, Research, 'savedResearches');
exports.removeFromSavedResearches = (req, res, next) => handleRemoveItem(req, res, next, Research, 'savedResearches');

exports.addToSavedTheses = (req, res, next) => handleSaveItem(req, res, next, Thesis, 'savedTheses');
exports.removeFromSavedTheses = (req, res, next) => handleRemoveItem(req, res, next, Thesis, 'savedTheses');

