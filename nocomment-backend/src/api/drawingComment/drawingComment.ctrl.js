import mongoose from 'mongoose';
import DrawingComment from '../../models/drawingComment';
import Post from '../../models/post';
import path from 'path';
import send from 'koa-send';
const { ObjectId } = mongoose.Types;
export const insert = async (ctx) => {
  console.log('drawingComment insert');
  const { filename } = ctx.request.file;
  const { postId } = ctx.request.body;
  const drawingComment = new DrawingComment({
    post: {
      _id: postId,
    },
    fileName: filename,
    noCommenter: ctx.state.noCommenter,
  });
  try {
    await drawingComment.save();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async (ctx) => {
  console.log('drawingComment list');
  const { postId } = ctx.query;
  const id = postId;
  if (!ObjectId.isValid(id)) {
    console.log('not valid');
    ctx.status = 400;
    return;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    const drawingComments = await DrawingComment.find({
      'post._id': postId,
    })
      .lean()
      .exec();
    ctx.body = drawingComments.map((drawingComment) => ({
      ...drawingComment,
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getImageFile = async (ctx) => {
  const directory = path.resolve(__dirname, '../../');
  const { fileName } = ctx.params;
  await send(ctx, fileName, {
    root: directory + '/public/commentImage',
  });
};
