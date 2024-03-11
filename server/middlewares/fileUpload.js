const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const IMAGE_MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg"
};

const PDF_MIME_TYPE_MAP = {
  "application/pdf": "pdf"
};

const imageUpload = multer({
  limits: 70 * 1024 * 1024,
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/images");
    },
    filename: function (req, file, cb) {
      const ext = IMAGE_MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!IMAGE_MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

const pdfUpload = multer({
  limits: 70 * 1024 * 1024 * 1024,
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/pdfs");
    },
    filename: function (req, file, cb) {
      const ext = PDF_MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!PDF_MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

module.exports = { imageUpload, pdfUpload };