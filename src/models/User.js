const mongoose = require('mongoose');
const PostSchema = require('./PostSchema');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters',
    },
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BlogPost',
    },
  ],
});

UserSchema.virtual('postCount').get(function () {
  // logic
  return this.posts.length;
});

module.exports = mongoose.model('User', UserSchema);
