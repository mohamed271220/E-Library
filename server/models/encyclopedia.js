const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const encyclopediaSchema = new Schema({
    title: { type: String, required: true, min: 2, max: 100 },
    publisher: { type: String, required: true, min: 2, max: 100 },
    ISBN: { type: String, required: true, min: 10, max: 13 },
    subject: { type: String, required: true, min: 2, max: 100 },
    image: { type: String, required: true, min: 2, max: 500 },
    volumes: [{
        volumeNumber: { type: Number, required: true },
        publicationYear: { type: Number, required: true },
        pdfLink: { type: String, required: false },
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model("Encyclopedia", encyclopediaSchema);