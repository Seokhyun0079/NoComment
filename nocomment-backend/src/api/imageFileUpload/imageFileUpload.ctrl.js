import path from 'path';
import send from 'koa-send';
import fs from 'fs';
export const uploadImageFile = (ctx) => {
  const { filename } = ctx.request.file;
  ctx.body = filename;
};

export const uploadProfileImageFile = async (ctx) => {
  const { filename } = ctx.request.file;
  const { stringId } = ctx.state.noCommenter;
  console.log(ctx.state.noCommenter);
  const directory = path.resolve(__dirname, '../../') + '/public/profileImage';
  let oldFile = await findProfileFileName(directory, stringId);
  let newFileType = filename.substring(filename.length - 4);
  fs.unlink(directory + '/' + oldFile, () => {
    console.log('file deletecd');
    console.log('file name : ' + directory + '/' + oldFile);
    fs.rename(
      directory + '/' + filename,
      directory + '/' + stringId + newFileType,
      () => {
        console.log('파일 이름 변경 완료');
        ctx.body = true;
      },
    );
  });
  ctx.body = false;
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
