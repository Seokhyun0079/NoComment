import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  noCommenter: {
    _id: mongoose.Types.ObjectId,
    stringId: String,
  },
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
