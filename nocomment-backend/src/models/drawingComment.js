import mongoose, { Schema } from 'mongoose';
const drawingCommentSchema = new Schema({
  post: {
    _id: mongoose.Types.ObjectId,
  },
  noCommenter: {
    _id: mongoose.Types.ObjectId,
    name: String,
    stringId: String,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  fileName: String,
});

const DrawingComment = mongoose.model('DrawingComment', drawingCommentSchema);
export default DrawingComment;
