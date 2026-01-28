const multer = require("multer");
const path = require("path");
const fs = require("fs");
// fs denotes to file system used to make folder 

const makeDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder =
      file.fieldname === "video"
        ? path.join(__dirname, "../uploads/videos")
        : path.join(__dirname, "../uploads/thumbnails");

    makeDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

module.exports = multer({ storage });
