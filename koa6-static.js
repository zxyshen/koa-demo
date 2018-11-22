const Koa = require('koa'),
  Router = require('koa-router'),
  views = require('koa-views'),
  // 静态资源服务器
  staticServer = require('koa-static'),
  app = new Koa(),
  router = new Router()

// 配置静态资源目录
// 这时候引入静态资源就需要这样引入
// css/base.css
// 以前是../assets/css/base.css
app.use(staticServer('assets'))
app.use(staticServer('static'))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)

router.get('/', async ctx => {
  const title = '你好ejs'
  // 标签要用<%-htag%>输出
  const htag = `<h2>这是一个h2标签</h2>`
  await ctx.render('index', {
    title,
    htag
  })
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
