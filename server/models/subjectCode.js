const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectCodeSchema = new Schema({
    code: { type: String, required: true, min: 2, max: 50 },
    name: { type: String, required: true, min: 2, max: 50 },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
    },
    semester: {
        type: String,
        enum: ["1st", "2nd"]
    },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }]
}, {
    timestamps: true,
});

module.exports = mongoose.model("SubjectCode", subjectCodeSchema);