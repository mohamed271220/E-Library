const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const isAdmin = require('./middlewares/is-admin');
const { imageUpload, pdfUpload } = require('./middlewares/fileUpload');
const path = require("path");
const { Storage } = require("@google-cloud/storage");
require('dotenv').config();

const swagger = require('./swagger');


// Initialize app
const app = express();
app.use(express.json());

// Set up middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
}));


// Set up Google Cloud Storage client
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEYFILE_PATH,
});
const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

/** 
* @swagger
*   /upload:
*     post:
*       summary: Upload a file
*       consumes:
*         - multipart/form-data
*       parameters:
*         - in: formData
*           name: file
*           type: file
*           description: The file to upload
*           required: true
*       responses:
*         '200':
*           description: File uploaded successfully
*         '400':
*           description: Invalid file type
*         '500':
*           description: Error uploading file
*/

app.post("/upload/photos", imageUpload.array("photos", 2), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path: filePath, originalname } = req.files[i];
        const ext = path.extname(originalname);
        const newPath = filePath + ext;

        if (fs.existsSync(filePath)) {
            const file = bucket.file(originalname);
            fs.createReadStream(filePath)
                .pipe(file.createWriteStream())
                .on("error", (err) => {
                    console.error(err);
                    res.status(500).send("Error uploading file to Google Cloud Storage");
                })
                .on("finish", () => {
                    uploadedFiles.push(`https://storage.googleapis.com/${bucket.name}/${file.name}`);
                    fs.unlinkSync(filePath);
                    if (uploadedFiles.length === req.files.length) {
                        res.status(200).send(uploadedFiles);
                    }
                });
        } else {
            console.error(`File ${filePath} does not exist`);
            res.status(500).send(`File ${filePath} does not exist`);
        }
    }
});

// Endpoint for PDFs
app.post("/upload/pdfs", isAdmin, pdfUpload.array("pdfs", 5), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path: filePath, originalname } = req.files[i];
        const ext = path.extname(originalname);
        const newPath = filePath + ext;
        if (fs.existsSync(filePath)) {
            const file = bucket.file(originalname);
            fs.createReadStream(filePath)
                .pipe(file.createWriteStream())
                .on("error", (err) => {
                    console.error(err);
                    res.status(500).send("Error uploading file to Google Cloud Storage");
                })
                .on("finish", () => {
                    uploadedFiles.push(`https://storage.googleapis.com/${bucket.name}/${file.name}`);
                    fs.unlinkSync(filePath);
                    if (uploadedFiles.length === req.files.length) {
                        res.status(200).send(uploadedFiles);
                    }
                });
        } else {
            console.error(`File ${filePath} does not exist`);
            res.status(500).send(`File ${filePath} does not exist`);
        }
    }
});


// TESTED: OK
app.use("/api/auth", require("./routes/auth"));
app.use("/api/news", require("./routes/news"));
app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/news"));
app.use("/api/library", require("./routes/library"));
app.use("/api/admin", require("./routes/admin"));


swagger(app);

// Set up error handling
app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    const status = error.statusCode || 500;
    const message = error.message || "something went wrong";
    res.status(status).json({ message: message, error: error });
});

// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });