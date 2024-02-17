const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subjectCodes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "SubjectCode",
        },
    ],
    books: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Book",
        },
    ],
}, {
    timestamps: true,
});

module.exports = mongoose.model("Department", departmentSchema);