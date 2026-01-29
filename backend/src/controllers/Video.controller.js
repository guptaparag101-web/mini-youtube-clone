const cloudinary = require("../config/cloudinary");
const Video = require("../models/Video.model");
const streamifier = require("streamifier");

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.files?.video || !req.files?.thumbnail) {
      return res.status(400).json({ message: "Files missing" });
    }

    // ---- VIDEO STREAM UPLOAD ----
    const uploadVideoToCloudinary = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "yt-clone/videos",
            resource_type: "video",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.files.video[0].buffer).pipe(stream);
      });

    // ---- THUMBNAIL (base64 OK) ----
    const thumbnailUpload = await cloudinary.uploader.upload(
      `data:${req.files.thumbnail[0].mimetype};base64,${req.files.thumbnail[0].buffer.toString("base64")}`,
      {
        folder: "yt-clone/thumbnails",
        resource_type: "image",
      }
    );

    const videoUpload = await uploadVideoToCloudinary();

    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      videoUrl: videoUpload.secure_url,
      thumbnailUrl: thumbnailUpload.secure_url,
      channelName: req.user.channelName,
      user: req.user.id,
    });

    res.status(201).json(video);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSingleVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

