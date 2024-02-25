const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
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