const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  postCount: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model('User', UserSchema);
