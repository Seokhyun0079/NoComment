import Router from '@koa/router';
import * as drawingCommentCtrl from './drawingComment.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import { multerAWS } from '../../common/awsS3Buket';
const drawingComment = new Router();
// const upload = multer({ storage, limits }); // note you c/an pass `multer` options here
drawingComment.post(
  '/insert',
  checkLoggedIn,
  multerAWS.single('file'),
  drawingCommentCtrl.insert,
);
drawingComment.get('/list', drawingCommentCtrl.list);
export default drawingComment;
