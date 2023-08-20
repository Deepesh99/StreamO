const mongoose = require('mongoose');

const { Schema } = mongoose;

// user schema
const userSchema = new Schema({
  description: {
    type: String,
  },
  doj: {
    type: Date,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscribers: {
    type: Number,
  },
  userName: {
    type: String,
    required: true,
  },
  videos: {
    type: Number,
  },
});

module.exports = mongoose.model('User', userSchema);
