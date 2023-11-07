// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
