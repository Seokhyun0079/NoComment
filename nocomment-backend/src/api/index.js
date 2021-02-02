import Router from '@koa/router';
import posts from './posts';
import noCommenters from './noCommenter';
import drawingComment from './drawingComment';
import imageFileUploadRouter from './imageFileUpload';
const api = new Router();

api.use('/posts', posts.routes());
api.use('/noCommenters', noCommenters.routes());
api.use('/drawingComment', drawingComment.routes());
api.use('/imageFileUpload', imageFileUploadRouter.routes());
// 라우터를 내보냅니다.
export default api;
