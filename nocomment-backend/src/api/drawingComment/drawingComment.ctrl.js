import mongoose from 'mongoose';
import DrawingComment from '../../models/drawingComment';
import Post from '../../models/post';
import path from 'path';
import fs from 'fs';
import send from 'koa-send';
import { logger } from '../../common/log';
import { DRAWING_COMMENT_UPLOAD_PATH } from '../../common/const';
const { ObjectId } = mongoose.Types;
export const insert = async (ctx) => {
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
    ctx.body = drawingComment;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const removeWithPost = async (ctx) => {
  const { id } = ctx.params;
  try {
    const drawingComments = await DrawingComment.find({
      'post._id': id,
    })
      .lean()
      .exec();

    let result = await DrawingComment.deleteMany({
      'post._id': id,
    });
    logger.info('remove drawingComment with post');
    logger.info(result);
    deleteDrawingCommentFiles(drawingComments);
    ctx.status = 204; // No Content (성공은 했지만 응답할 데이터는 없음)
  } catch (e) {
    logger.error(e);
  }
};

const deleteDrawingCommentFiles = async (drawingComments) => {
  try {
    for (let comment of drawingComments) {
      fs.unlink(DRAWING_COMMENT_UPLOAD_PATH + '/' + comment.fileName, () => {
        logger.info(
          'delete file : ' +
            DRAWING_COMMENT_UPLOAD_PATH +
            '/' +
            comment.fileName,
        );
      });
    }
  } catch (e) {
    logger.info(e);
  }

  logger.info('remove drawingComment files');
};

export const list = async (ctx) => {
  const { postId } = ctx.query;
  const id = postId;
  if (!ObjectId.isValid(id)) {
    ctx.status = 403;
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

export const getDrawingCommentImageFile = async (ctx) => {
  console.log('getDrawingCommentImageFile');
  const directory = path.resolve(__dirname, '../../');
  const { fileName } = ctx.params;
  await send(ctx, fileName, {
    root: directory + '/public/commentImage',
  });
};
