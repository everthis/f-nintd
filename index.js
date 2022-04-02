const Koa = require('koa');
const nunjucks = require('nunjucks')
const app = new Koa();

nunjucks.configure('tpl', { autoescape: true });

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

function renderTpl(name, params) {
  return new Promise((resolve, reject) => {
    nunjucks.render(name, params, function(err, res) {
      if(err) {
        resolve('Error')
        return
      }
      return resolve(res)
    });
  })
}
// response

app.use(async ctx => {
  const res = await renderTpl('index.html', { foo: 'bar' });
  ctx.body = res;
});

app.listen(5433);