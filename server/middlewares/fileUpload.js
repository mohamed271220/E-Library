const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "application/pdf": "pdf"
};

const fileUpload = multer({
  limits: 70 * 1024 * 1024,
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/images");
    },
    filename: function (req, file, cb) {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

module.exports = fileUpload;




/*

// Route for uploading a single image
router.post('/uploadSingleImage', fileUpload.single('image'), (req, res) => {
  // Your code here
});

// Route for uploading multiple images
router.post('/uploadMultipleImages', fileUpload.array('images', 10), (req, res) => {
  // Your code here
});

// Route for uploading a single PDF
router.post('/uploadSinglePDF', fileUpload.single('pdf'), (req, res) => {
  // Your code here
});
*/