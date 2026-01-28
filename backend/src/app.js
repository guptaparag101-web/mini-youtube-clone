const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mini-youtube-clone.vercel.app"
    ],
    credentials: true
  })
);




app.use(express.json());


app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/videos", require("./routes/video.routes"));

module.exports = app;
