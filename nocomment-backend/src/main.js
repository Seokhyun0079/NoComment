const Koa = require('koa');
const api = require('./api');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const router = new Router();

router.use('/api', api.routes());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listenig to port 4000');
});
