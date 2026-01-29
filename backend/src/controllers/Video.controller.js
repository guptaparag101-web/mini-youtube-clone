const Video = require("../models/Video.model");

exports.uploadVideo = async (req, res) => {
  try {
    console.log("UPLOAD BODY:", req.body);
    console.log("UPLOAD FILES:", req.files);

    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ message: "Files missing" });
    }

    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.files.video[0].path,
      thumbnailUrl: req.files.thumbnail[0].path,
      channelName: req.user.channelName,
      user: req.user.id,
    });

    return res.status(201).json(video);
  } catch (err) {
    console.error("UPLOAD ERROR FULL:", err);
    return res.status(500).json({
      message: "Upload failed",
      error: err.message,
    });
  }
};






exports.getAllVideos = async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 });
  res.json(videos);
};

exports.getSingleVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  res.json(video);
};
