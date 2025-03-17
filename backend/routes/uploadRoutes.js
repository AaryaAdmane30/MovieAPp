import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname); // Get the file extension
    cb(null, `${file.fieldname}-${Date.now()}${extname}`); // Generate a unique file name
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|webp/; // Allow jpg, jpeg, png, and webp file extensions
  const mimetypes = /image\/jpeg|image\/png|image\/webp/; // Allow image MIME types

  // Check if file extension and MIME type match
  if (
    filetypes.test(path.extname(file.originalname).toLowerCase()) &&
    mimetypes.test(file.mimetype)
  ) {
    return cb(null, true); // Accept the file
  } else {
    cb(new Error("Images Only"), false); // Reject the file
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image upload successfully !",
        image: `${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image File Provided" });
    }
  });
});

export default router;
