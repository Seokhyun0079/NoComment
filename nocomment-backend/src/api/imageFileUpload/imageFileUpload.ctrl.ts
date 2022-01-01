import path from 'path';
import send from 'koa-send';
import fs from 'fs';
import s3 from '../../common/awsS3Buket';
import NoCommenter from '../../models/noCommenter';
import { logger } from '../../common/log';
export const uploadImageFile = (ctx) => {
  const { key } = ctx.request.file;
  ctx.body = key;
};

export const uploadProfileImageFile = async (ctx) => {
  logger.info(ctx.request.file);
  const { key } = ctx.request.file;
  const { profileImg, _id } = ctx.state.noCommenter;
  const params = {
    Bucket: 'nocommentbuket/profileImage',
    Key: profileImg,
  };
  s3.deleteObject(params, function (err, data) {
    logger.error(err);
    logger.error(data);
  });
  try {
    await NoCommenter.updateOne({ _id: _id }, { profileImg: key });
    const noCommenter = await NoCommenter.findById({
      _id: _id,
    });
    ctx.body = noCommenter.serialize();
    const token = noCommenter.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
