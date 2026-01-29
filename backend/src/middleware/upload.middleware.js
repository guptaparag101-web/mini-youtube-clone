const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "video") {
      return {
        folder: "yt-clone/videos",
        resource_type: "video",
      };
    }

    return {
      folder: "yt-clone/thumbnails",
      resource_type: "image",
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
