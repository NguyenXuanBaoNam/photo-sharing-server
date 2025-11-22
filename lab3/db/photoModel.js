const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: String,
  date_time: Date,
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    _id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
  },
});

const photoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId,
  comments: [commentSchema],
  file_name: String,
  date_time: Date,
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;


