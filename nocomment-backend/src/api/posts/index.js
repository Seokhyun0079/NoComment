import Router from 'koa-router';
import * as postsCtrl from './post.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router();

post.get('/:id', postsCtrl.read);
// post.put('/:id', postsCtrl.replace);
post.delete('/', checkLoggedIn, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.update);
// posts.use('/:id', postsCtrl.checkObjectId, post.route());
export default posts;
