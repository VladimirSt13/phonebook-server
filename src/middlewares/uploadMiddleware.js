import multer from "multer";
import path from "path";

import { createFolderIsNotExist } from "../helpers/apiHelpers.js";
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

export const uploadMiddleware = multer({ storage });
