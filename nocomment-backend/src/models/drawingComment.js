import mongoose, { Schema } from 'mongoose';
const DrawingCommentSchema = new Schema({
    post: {
        _id: mongoose.Types.ObjectId
    }
});

const DrawingComment = mongoose.model('DrawingComment', DrawingCommentSchema);
export default DrawingComment;