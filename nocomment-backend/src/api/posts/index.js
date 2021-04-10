import Router from 'koa-router';
import * as postsCtrl from './post.ctrl';
import { removeWithPost } from '../drawingComment/drawingComment.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.postvalidation, postsCtrl.write);

const post = new Router(); // /api/posts/:id
post.get('/', postsCtrl.read);
post.delete(
  '/',
  checkLoggedIn,
  postsCtrl.checkOwnPost,
  postsCtrl.remove,
  //게시글 삭제 시 댓글도 삭제함
  removeWithPost,
);
post.patch(
  '/',
  checkLoggedIn,
  postsCtrl.postvalidation,
  postsCtrl.checkOwnPost,
  postsCtrl.update,
);

posts.use('/:id', postsCtrl.getPostById, post.routes());

export default posts;
