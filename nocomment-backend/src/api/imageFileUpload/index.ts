import Router from 'koa-router';
import * as imageFileUploadCtrl from './imageFileUpload.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import { s3ImageMulter } from '../../common/awsS3Buket';

const imageFileUploadRouter = new Router();

imageFileUploadRouter.post(
  '/postImage',
  checkLoggedIn,
  s3ImageMulter('/postImage').single('file'),
  imageFileUploadCtrl.uploadImageFile,
);
imageFileUploadRouter.post(
  '/profileImage',
  checkLoggedIn,
  s3ImageMulter('/profileImage').single('file'),
  imageFileUploadCtrl.uploadProfileImageFile,
);
export default imageFileUploadRouter;
