import path from 'path';
import send from 'koa-send';
import fs from 'fs';
import s3 from '../../common/awsS3Buket';
import NoCommenter from '../../models/noCommenter';
import { logger } from '../../common/log';
export const uploadImageFile = (ctx) => {
  const { filename } = ctx.request.file;
  ctx.body = filename;
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

export const getPostImageFile = async (ctx) => {
  console.log('getPostImageFile');
  const directory = path.resolve(__dirname, '../../');
  const { fileName } = ctx.params;
  await send(ctx, fileName, {
    root: directory + '/public/postImage',
  });
};

export const getProfileImageFile = async (ctx) => {
  console.log('getProfileImageFile');
  const directory = path.resolve(__dirname, '../../') + '/public/profileImage';
  let fileName = await findProfileFileName(
    directory,
    ctx.state.noCommenter.stringId,
  );
  if (!fileName) {
    return;
  }
  await send(ctx, fileName, {
    root: directory,
  });
};

const findProfileFileName = async (directory, fileName) => {
  let fileType = '';
  let fileList = fs.readdirSync(directory);
  for (let index in fileList) {
    let item = fileList[index];
    let itemName = (item + '').substr(0, item.length - 4);
    if (fileName == itemName) {
      fileType = (item + '').substring(item.length - 4);
      fileName = itemName;
      return fileName + fileType;
    }
  }
};
