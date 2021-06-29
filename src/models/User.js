const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  postCount: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model('User', UserSchema);
