// cookie的作用
// 1.让浏览器保存一点数据 
// 2.用同一个浏览器访问同一个域名的时候可以数据共享

//保存cookie  ctx.cookies.set(name, value, options)
/*
  options
    maxAge: cookie有效时长，单位：毫秒数
    expires: 过期时间，unix时间戳
    path: cookie的路径默认是'/
    domain: cookie域名
    secure: 默认false，设置为true就只有https能用
    httpOnly: 是否只是服务器可以访问cookie，默认是true
    overwrite：是否覆盖以前的同名cookie，默认是false
*/

//获取cookie  ctx.cookies.get(name)

// 注意：如果cookie是中文的需要这样处理
// const name = new Buffer('老沈啊').toString('base64')
// 然后取的时候 const name = new Buffer(ctx.cookies.get(name),'base64').toString()
const Koa = require('koa'),
  Router = require('koa-router'),
  views = require('koa-views'),
  app = new Koa(),
  router = new Router()

router.get('/', async ctx => {
  ctx.cookies.set('userName','zxyshen',{
    maxAge:10*600*600
  })
})

router.get('/news', async ctx=>{
  const userName = ctx.cookies.get('userName')
  console.log(userName)
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
