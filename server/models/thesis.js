const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thesisSchema = new Schema({
    title: { type: String, required: true, min: 2, max: 100 },
    author: { type: String, required: true, min: 2, max: 100 },
    university: { type: String, required: true, min: 2, max: 100 },
    degree: { type: String, required: true, min: 2, max: 100 },
    department: { type: String, required: true, min: 2, max: 100 },
    year: { type: Number, required: true },
    abstract: { type: String, required: true },
    pdfLink: { type: String, required: false },
    image: { type: String, required: false },
    supervisor: { type: String, required: false, min: 2, max: 100 },
    keywords: [{ type: String }],
    doi: { type: String },
    citations: { type: Number, default: 0 },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Thesis", thesisSchema);

// title is the title of the thesis.
// author is the name of the student who wrote the thesis.
// university is the name of the university where the thesis was submitted.
// degree is the degree for which the thesis was submitted (e.g., "Master of Science").
// department is the department within the university that supervised the thesis.
// year is the year the thesis was submitted.
// abstract is a brief summary of the thesis.
// image is a link to an image representing the thesis.
// pdfLink is a link to the full text of the thesis in PDF format.
// supervisor is the thesis advisor.
// keywords are important words or phrases associated with the thesis.
// doi is the Digital Object Identifier, a unique identifier for the thesis.
// citations is the number of times this thesis has been cited by other works.