const Koa = require('koa'),
  Router = require('koa-router'),
  // 加载art-template模块
  render = require('koa-art-template'),
  path = require('path'),
  app = new Koa(),
  router = new Router()

render(app, {
  // views路径
  root: path.join(__dirname, 'views'),
  // 扩展名
  extname: '.html',
  // 是否开启调试
  debug: process.env.NODE_ENV !== 'prodection'
})

router.get('/', async ctx => {
  const title = 'art-template'
  // 标签要用<%-htag%>输出
  const htag = `<h2>这是一个h2标签</h2>`
  const arr = ['111', '222', '333']
  await ctx.render('index', {
    title,
    htag,
    arr
  })
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
