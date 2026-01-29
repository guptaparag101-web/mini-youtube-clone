const cloudinary = require("../config/cloudinary");
const Video = require("../models/Video.model");

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.files?.video || !req.files?.thumbnail) {
      return res.status(400).json({ message: "Files missing" });
    }

    // upload video
    const videoUpload = await cloudinary.uploader.upload(
      `data:video/mp4;base64,${req.files.video[0].buffer.toString("base64")}`,
      {
        resource_type: "video",
        folder: "yt-clone/videos",
      }
    );

    // upload thumbnail
    const thumbUpload = await cloudinary.uploader.upload(
      `data:image/png;base64,${req.files.thumbnail[0].buffer.toString("base64")}`,
      {
        resource_type: "image",
        folder: "yt-clone/thumbnails",
      }
    );

    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      videoUrl: videoUpload.secure_url,
      thumbnailUrl: thumbUpload.secure_url,
      channelName: req.user.channelName,
      user: req.user.id,
    });

    res.status(201).json(video);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
