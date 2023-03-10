const multer = require("multer");
const path = require("path");
const { createFolderIsNotExist } = require("../helpers/apiHelpers");
// const { v4: uuid } = require("uuid");

const TMP_DIR = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    createFolderIsNotExist(TMP_DIR);
    cb(null, TMP_DIR);
  },
  filename: (req, file, cb) => {
    const [fileName, extension] = file.originalname.split(".");
    cb(null, `${fileName}.${extension}`);
  },
  limits: {
    fileSize: 1048576,
  },
});

const uploadMiddleware = multer({ storage });

module.exports = {
  uploadMiddleware,
};
