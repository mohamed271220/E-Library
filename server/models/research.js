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