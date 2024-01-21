/*Imports multer, sets up storage configuration, destiation is set to public/resumes and multer sets with storage config and a limit of 5 mb */

import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null, "public/resumes");
    } catch (err) {
      console.error(err);
    }
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const uploadFile = multer({
  storage: storageConfig,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default uploadFile;
