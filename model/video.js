const mongoose = require('mongoose');

const { Schema } = mongoose;

// user schema
const videoSchema = new Schema({
  description: {
    //
  },
  likes: {
    //
  },
  title: {
    type: String,
    required: true,
  },
  uploadDate: {
    //
  },
  url: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  views: {
    //
  },
});

module.exports = mongoose.model('Video', videoSchema);
