import Router from 'koa-router';
import * as imageFileUploadCtrl from './imageFileUpload.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import { postImageMulter, profileImageMulter } from '../../common/awsS3Buket';
import koaBody from 'koa-body';

const imageFileUploadRouter = new Router();

imageFileUploadRouter.post(
  '/postImage',
  checkLoggedIn,
  postImageMulter.single('file'),
  imageFileUploadCtrl.uploadImageFile,
);
imageFileUploadRouter.post(
  '/profileImage',
  checkLoggedIn,
  profileImageMulter.single('file'),
  imageFileUploadCtrl.uploadProfileImageFile,
);
export default imageFileUploadRouter;
