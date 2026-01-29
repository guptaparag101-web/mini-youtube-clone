const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    if (file.fieldname === "video") {
      return {
        folder: "yt-clone/videos",
        resource_type: "video",
        allowed_formats: ["mp4", "mov", "avi"],
      };
    }

    return {
      folder: "yt-clone/thumbnails",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png"],
    };
  },
});

module.exports = multer({ storage });
