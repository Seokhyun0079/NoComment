const Router = require('koa-router');
const posts = require('./posts');
const noCommenters = require('./noCommenter');
const api = new Router();

api.use('/posts', posts.routes());
api.use('/noCommenters', noCommenters.routes());
module.exports = api;
