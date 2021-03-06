const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
