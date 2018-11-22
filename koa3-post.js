const Koa = require('koa'),
  Router = require('koa-router'),
  views = require('koa-views'),
  // 用bodyParser获取post数据
  bodyParser = require('koa-bodyparser'),
  app = new Koa(),
  router = new Router()

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)
router.get('/', async ctx => {
  await ctx.render('form')
})
//获取post数据
router.post('/doAdd', async ctx => {
  // 会打印出封装号的json对象，里面就是post的数据了
  console.log(ctx.request.body)
})

// 载入bodyParser
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
