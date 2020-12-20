import mongoose, { Schema } from 'mongoose';
const DrawingCommentSchema = new Schema({
    post: {
        _id: mongoose.Types.ObjectId
    },
    noCommenter: {
        _id: mongoose.Types.ObjectId,
        stringId: String,
    },
    fileName: String
});

const DrawingComment = mongoose.model('DrawingComment', DrawingCommentSchema);
export default DrawingComment;