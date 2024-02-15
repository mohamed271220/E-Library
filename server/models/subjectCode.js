const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectCodeSchema = new Schema({
    code: { type: String, required: true, min: 2, max: 50 },
    subject: { type: String, required: true, min: 2, max: 50 },
    semester: { type: Number, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }]
}, {
    timestamps: true,
});

module.exports = mongoose.model("SubjectCode", subjectCodeSchema);