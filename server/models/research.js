const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const researchSchema = new Schema({
    title: { type: String, required: true, min: 2, max: 100 },
    author: { type: String, required: true, min: 2, max: 100 },
    year: { type: Number, required: true },
    abstract: { type: String, required: true },
    image: { type: String, required: true, min: 2, max: 500 },
    pdfLink: { type: String, required: false },
    specialization: { type: String, required: true, min: 2, max: 100 },
    keywords: [{ type: String }],
    citations: { type: Number, default: 0 },
    doi: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Research", researchSchema);


// title is the title of the research.
// author is the name of the researcher who conducted the research.
// year is the year the research was conducted or published.
// abstract is a brief summary of the research.
// pdfLink is a link to the full text of the research in PDF format.
// specialization is the field or area of specialization that the research falls under.
// Citation: In the context of research papers, a citation is a reference to a published or unpublished source. It allows readers to trace the sources of information used in the paper. The number of citations a paper has can be an indicator of its influence or importance in the field.
// citations is a Number because it's storing a count, and it's initialized with a default value of 0 because when a paper is first added, it hasn't been cited yet. As other papers cite it, this count would be incremented.
// Keyword: Keywords in a research paper are important words or phrases that give a quick indication of the content of the paper. They are often used for indexing in databases, making it easier for others to find the paper when searching for certain topics.
// DOI (Digital Object Identifier): A DOI is a unique alphanumeric string assigned to a digital object, such as a research paper, to provide a persistent link to its location on the internet. Unlike a URL, which can change over time, a DOI always remains the same, ensuring the paper can always be found. A DOI often looks like this: 10.1000/xyz123