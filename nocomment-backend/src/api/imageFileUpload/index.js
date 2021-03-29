import Router from 'koa-router';
import multer from '@koa/multer';
import * as imageFileUploadCtrl from './imageFileUpload.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import path from 'path';

const imageFileUploadRouter = new Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let url = req.url;
    let lastIndex = url.lastIndexOf('/');
    let folderName = url.substring(lastIndex);
    console.log(folderName);
    cb(null, path.join('src/public' + folderName));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString(16)}${file.originalname}`);
  },
});
const limits = {
  fields: 10, //Number of non-file fields
  fileSize: 1024 * 1024 * 1024, //File Size Unit b
  files: 1, //Number of documents
};
const upload = multer({ storage, limits }); // note you c/an pass `multer` options here

imageFileUploadRouter.post(
  '/postImage',
  checkLoggedIn,
  upload.single('file'),
  imageFileUploadCtrl.uploadImageFile,
);
imageFileUploadRouter.post(
  '/profileImage',
  checkLoggedIn,
  upload.single('file'),
  imageFileUploadCtrl.uploadProfileImageFile,
);
imageFileUploadRouter.get(
  '/getProfileImageFile',
  imageFileUploadCtrl.getProfileImageFile,
);
imageFileUploadRouter.get(
  '/getPostImageFile/:fileName',
  imageFileUploadCtrl.getPostImageFile,
);
export default imageFileUploadRouter;
