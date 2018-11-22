const Koa = require('koa')
const Router = require('koa-router')

const router = new Router()
const app = new Koa()

router.get('/', async ctx => {
  ctx.body = '首页'
})

// koa应用级中间件：在匹配任何路由之前执行
// 例如输入:http://localhost:3000/ 会先执行console.log '应用级中间件'再执行'/'
// 然后再执行if else判断
app.use(async (ctx, next) => {
  console.log('应用级中间件')
  // 当前路由完成后继续向下匹配，如果不写则只执行一次就不会继续向下匹配了
  await next()
  if (ctx.status === 404) {
    ctx.body = "404"
  }else{
    console.log(ctx.status)
  }
})

// koa路由级中间件：
router.get('/rou', async (ctx, next) => {
  console.log('路由级中间件')
  // 如果不写这个下面那个就不会执行了
  await next()
})

router.get('/rou', async ctx => {
  ctx.body = '路由级中间件'
})

// 获取get传值
router.get('/getParms', async ctx => {
  // ctx就是一个request、response封装后的集合
  // 可以直接调用ctx.query或者ctx.request.query都是一样的

  // 用的最多的方式，获取json对象
  console.log(ctx.query)
  // 获取string
  console.log(ctx.querystring)
})

// 动态路由
router.get('/dynamic/:parm/:parms', async ctx => {
  console.log(ctx.params)
})

// 当路由跳转后没匹配到response，allowedMethods会自动给我们加response(not found)
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
  console.log('success')
})
