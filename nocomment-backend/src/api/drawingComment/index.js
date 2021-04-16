import Router from '@koa/router';
import * as drawingCommentCtrl from './drawingComment.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import { drawingCommentMulter } from '../../common/awsS3Buket';
const drawingComment = new Router();
// const upload = multer({ storage, limits }); // note you c/an pass `multer` options here
drawingComment.post(
  '/insert',
  checkLoggedIn,
  drawingCommentMulter.single('file'),
  drawingCommentCtrl.insert,
);
drawingComment.get('/list', drawingCommentCtrl.list);
export default drawingComment;
