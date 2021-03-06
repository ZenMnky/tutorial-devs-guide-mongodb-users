const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
