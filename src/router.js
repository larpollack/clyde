const Router = require('koa-router'),
router = new Router(),
model = require('./rhinoceros');

router.get('/rhinoceros', (ctx, next) => {
  const rhinoceroses = model.getAll();
  ctx.response.body = {rhinoceroses};
});

router.post('/rhinoceros', (ctx, next) => {
  ctx.response.body = model.newRhinoceros(ctx.request.body);
});

module.exports = router;
