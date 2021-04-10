import Router from '@koa/router';
import multer from '@koa/multer';
import * as drawingCommentCtrl from './drawingComment.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import { DRAWING_COMMENT_UPLOAD_PATH } from '../../common/const';
const path = require('path');
const drawingComment = new Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(DRAWING_COMMENT_UPLOAD_PATH));
  },
  filename: function (req, file, cb) {
    let type = 'png';
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
  },
});
const limits = {
  fields: 10, //Number of non-file fields
  fileSize: 1024 * 1024 * 1024, //File Size Unit b
  files: 1, //Number of documents
};

const upload = multer({ storage, limits }); // note you c/an pass `multer` options here
drawingComment.post(
  '/insert',
  checkLoggedIn,
  upload.single('file'),
  drawingCommentCtrl.insert,
);
drawingComment.get('/list', drawingCommentCtrl.list);
drawingComment.get(
  '/getImageFile/:fileName',
  drawingCommentCtrl.getDrawingCommentImageFile,
);
export default drawingComment;
