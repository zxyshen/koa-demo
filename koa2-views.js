// 要用koa的模版引擎首先要安装koa-views
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')

const app = new Koa()
const router = new Router()

// 配置模版引擎
// 方法1 处理的是ejs结尾的ejs
app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)
// 方法2 处理的是html结尾的ejs
// app.use(
//   views(__dirname + '/views', {
//     map: { html: 'ejs' }
//   })
// )

router.get('/news', async ctx => {
  const arr = ['111', '222', '333']
  const title = 'ejs'
  await ctx.render('news', {
    arr,
    title
  })
})

router.get('/', async ctx => {
  const title = '你好ejs'
  // 标签要用<%-htag%>输出
  const htag = `<h2>这是一个h2标签</h2>`
  await ctx.render('index', {
    title,
    htag
  })
})

// 公共数据一般都会配置在应用级路由里
app.use(async (ctx, next) => {
  // 配置公共数据，此时所有模版都可以使用userinfo
  ctx.state = {
    userinfo: 'zxyshen',
    age: '20'
  }
  await next()
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
