const mongoose = require('mongoose');
const PostSchema = require('./Post_Schema');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters',
    },
  },
  postCount: {
    type: Number,
    required: false,
    default: 0,
  },
  posts: [PostSchema],
});

module.exports = mongoose.model('User', UserSchema);
