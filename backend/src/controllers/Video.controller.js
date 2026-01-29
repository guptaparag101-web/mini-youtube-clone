const Video = require("../models/Video.model");

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.files?.video || !req.files?.thumbnail) {
      return res.status(400).json({ message: "Files missing" });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl: req.files.video[0].path,       
      thumbnailUrl: req.files.thumbnail[0].path,
      channelName: req.user.channelName,
      user: req.user.id,
    });

    res.status(201).json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
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
