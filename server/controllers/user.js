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

exports.readBook = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { bookId } = req.params;
        const { editionNumber } = req.query;
        const userId = req.userId;

        let book = await Book.findById(bookId).select('editions').session(session);

        if (!editionNumber) {
            editionNumber = Math.max(...book.editions.map(ed => ed.number));
        }

        const edition = book.editions.find(ed => ed.number === editionNumber);
        if (!edition) {
            throw new Error('Edition not found');
        }

        // Update user's reading history
        await User.findByIdAndUpdate(userId, {
            $push: {
                readingHistory: {
                    book: bookId,
                    startedReading: new Date(),
                    edition: editionNumber
                }
            }
        }).session(session);

        await session.commitTransaction();

        res.status(200).json({ edition });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ error: error.toString() });
    } finally {
        session.endSession();
    }
}