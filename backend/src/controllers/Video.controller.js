const cloudinary = require("../config/cloudinary");
const Video = require("../models/Video.model");

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.files?.video || !req.files?.thumbnail) {
      return res.status(400).json({ message: "Files missing" });
    }

    
    const videoUpload = await cloudinary.uploader.upload(
      `data:${req.files.video[0].mimetype};base64,${req.files.video[0].buffer.toString("base64")}`,
      {
        resource_type: "video",
        folder: "yt-clone/videos",
      }
    );

    // Upload THUMBNAIL to Cloudinary
    const thumbnailUpload = await cloudinary.uploader.upload(
      `data:${req.files.thumbnail[0].mimetype};base64,${req.files.thumbnail[0].buffer.toString("base64")}`,
      {
        resource_type: "image",
        folder: "yt-clone/thumbnails",
      }
    );

    
    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      videoUrl: videoUpload.secure_url,       
      thumbnailUrl: thumbnailUpload.secure_url, 
      channelName: req.user.channelName,
      user: req.user.id,
    });

    return res.status(201).json(video);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    return res.json(videos);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getSingleVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    return res.json(video);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
