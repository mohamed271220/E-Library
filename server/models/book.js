const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true, min: 2, max: 50 },
    author: { type: String, required: true, min: 2, max: 50 },
    description: { type: String, required: true, min: 2, max: 500 },
    image: { type: String, required: true, min: 2, max: 500 },
    code: {
        type: mongoose.Types.ObjectId,
        ref: "subjectCode",
    },
    department: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
    },
    editions: [{
        editionNumber: { type: Number, required: true },
        publicationDate: { type: Date, required: true },
        changes: { type: String, required: false },
        pdfLink: { type: String, required: false }
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model("Book", bookSchema);