const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const {
  uploadVideo,
  getAllVideos,
  getSingleVideo,
} = require("../controllers/Video.controller");

router.post(
  "/upload",
  auth,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadVideo
);

router.get("/", getAllVideos);
router.get("/:id", getSingleVideo);

module.exports = router;
