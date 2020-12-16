import Router from '@koa/router';
import multer from '@koa/multer';
import * as drawingCommentCtrl from './drawingComment.ctrl';
const path = require('path');
const drawingComment = new Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('./commentImage'))
    },
    filename: function (req, file, cb) {
        let type = 'png';
        cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
    }
})
const limits = {
    fields: 10,//Number of non-file fields
    fileSize: 1024 * 1024 * 1024,//File Size Unit b
    files: 1//Number of documents
}

const upload = multer({storage, limits}); // note you can pass `multer` options here
drawingComment.post('/insert', upload.single('file') , (ctx) => {
    console.log('ctx.request.file', ctx.request.file);
    console.log('ctx.file', ctx.file);
    console.log('ctx.request.body', ctx.request.body);
    ctx.body = 'done';
})
export default drawingComment;