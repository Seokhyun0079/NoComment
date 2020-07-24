const Router = require('koa-router');
const noCommenterCtrl = require('./noCommenter.ctrl');
const noCommenters = new Router();

noCommenters.post('/register', noCommenterCtrl.signup);
noCommenters.post('/login', noCommenterCtrl.signin);
noCommenters.get('/cehck', noCommenterCtrl.check);
noCommenters.post('/logout', noCommenterCtrl.logout);
module.exports = noCommenters;
