const multer = require("multer");
const fs = require("fs");
const path = require("path");

const ensureFolderExists = (folder) => {
  console.log("Ensuring folder exists...", folder);
  if (!fs.existsSync(folder)) {
    console.log("Folder does not exist, creating it...");
    fs.mkdirSync(folder, { recursive: true });
  }
};
const configureMulter = (folder, maxFileSize, fileLimit) => {
  // Ensure the folder exists
  ensureFolderExists(folder);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  return multer({
    storage: storage,
    limits: { fileSize: maxFileSize },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = fileTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error("Only JPEG, JPG, and PNG files are allowed!"));
      }
    },
  });
};
const userProfileUpload = configureMulter("uploads/users/", 5 * 1024 * 1024, 1); // Single file, max 5MB
const businessProfileUpload = configureMulter(
  "uploads/business/",
  5 * 1024 * 1024,
  10
); // Multiple files, max 5MB per file
module.exports = { userProfileUpload, businessProfileUpload };
