const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: ObjectId, ref: 'User' },
  desc: { type: String },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  img: { type: String },
});

const Playlist = mongoose.model('playlist', playlistSchema);

module.exports = Playlist;
