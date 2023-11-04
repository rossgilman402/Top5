const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String },
  img: { type: String },
  duration: { type: String },
  uri: { type: String },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
