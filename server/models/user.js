const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true, min: 2, max: 50 },
        email: { type: String, required: true, unique: true, min: 2, max: 50 },
        password: { type: String, required: true, minlength: 6 },
        image: {
            type: String,
            required: false,
            default:
                "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        borrowedBooks: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Book"
            }
        ],
        readingHistory: [
            {
                bookId: {
                    type: mongoose.Types.ObjectId,
                    ref: "Book",
                },
                startedReading: Date,
            },
        ],
        booksPublished: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Book",
            },
        ],

    },
    {
        timestamps: true,
    }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);