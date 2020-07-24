const Router = require('koa-router');
const postsCtrl = require('./post.ctrl');
const posts = new Router();



posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.read);
posts.put('/:id', postsCtrl.replace);
posts.patch('/:id', postsCtrl.update);
module.exports = posts;
