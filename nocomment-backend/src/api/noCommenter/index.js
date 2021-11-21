import checkLoggedIn, { authorityCheck } from '../../lib/checkLoggedIn';

const Router = require('@koa/router');
const noCommenterCtrl = require('./noCommenter.ctrl');
const noCommenters = new Router();

noCommenters.post('/register', noCommenterCtrl.signup);
noCommenters.post('/login', noCommenterCtrl.signin);
noCommenters.get('/check', noCommenterCtrl.check);
noCommenters.post('/logout', noCommenterCtrl.logout);
noCommenters.post('/authCode', noCommenterCtrl.authCode);
noCommenters.post('/update', noCommenterCtrl.update);
noCommenters.post(
  '/updateByAdmin',
  authorityCheck,
  noCommenterCtrl.updateByAdmin,
);
noCommenters.get('/list', checkLoggedIn, authorityCheck, noCommenterCtrl.list);
export default noCommenters;
