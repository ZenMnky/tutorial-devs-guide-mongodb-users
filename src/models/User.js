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
  posts: [PostSchema],
});

UserSchema.virtual('postCount').get(function () {
  // logic
  return this.posts.length;
});

module.exports = mongoose.model('User', UserSchema);
