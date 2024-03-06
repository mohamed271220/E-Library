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
        savedBooks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Book",
            },
        ],
        savedJournals: [
            {
                type: Schema.Types.ObjectId,
                ref: "Journal",
            },
        ],
        savedTheses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thesis",
            },
        ],
        savedEncyclopedias: [
            {
                type: Schema.Types.ObjectId,
                ref: "Encyclopedia",
            },
        ],
        savedResearches: [
            {
                type: Schema.Types.ObjectId,
                ref: "Research",
            },
        ],
        

    },
    {
        timestamps: true,
    }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
