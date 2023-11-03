const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const playListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: ObjectId, ref: "user", required: true },
  desc: { type: String },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  img: { type: String },
});

const PlayList = mongoose.model("playList", playListSchema);

module.exports = { PlayList };
