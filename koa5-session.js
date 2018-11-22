// 当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，
// 生成一个类似于key,value的键值对，然后将key(cookie)返回到浏览器，浏览器
// 下次再访问时，携带 key(cookie)，找对应的session

// 上面一段话最重要的就是 session 的key还是放在cookie里的

const Koa = require('koa'),
  Router = require('koa-router'),
  render = require('koa-art-template'),
  path = require('path'),
  // 引入session模块
  session = require('koa-session'),
  app = new Koa(),
  router = new Router()

// 配置session middleware
app.keys = ['some secret hurr'] //cookie签名
const CONFIG = {
  key: 'koa:sess', //默认
  maxAge: 8640000, //cookie过期时间
  overwrite: true,
  httpOnly: true,
  signed: true, //签名默认为true
  rolling: false, //(* 每次 *) 重新请求时，重新设置过期时间
  renew: false //重新请求(* 快过期 *)时，重新设置过期时间
}

// 挂载session middleware
app.use(session(CONFIG, app))

render(app, {
  // views路径
  root: path.join(__dirname, 'views'),
  // 扩展名
  extname: '.html',
  // 是否开启调试
  debug: process.env.NODE_ENV !== 'prodection'
})

router.get('/login', async ctx => {
  ctx.session.userinfo = '张三'
})

router.get('/', async ctx => {
  console.log(ctx.session.userinfo)
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)


