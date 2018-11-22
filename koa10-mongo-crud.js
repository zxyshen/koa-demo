const Koa = require('koa'),
  router = require('koa-router')(),
  render = require('koa-art-template'),
  path = require('path'),
  bodyParser = require('koa-bodyparser'),
  DBHelper = require('./koa9-mongo-dbhelper')

const app = new Koa()

//配置post提交数据的中间件
app.use(bodyParser())

//配置 koa-art-template模板引擎
render(app, {
  root: path.join(__dirname, 'views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
})
//显示学员信息
router.get('/', async ctx => {
  const result = await DBHelper.find('user', {})

  console.log(result)
  await ctx.render('index', {
    list: result
  })
})
//增加学员
router.get('/add', async ctx => {
  await ctx.render('add')
})

//执行增加学员的操作
router.post('/doAdd', async ctx => {
  let data = await DBHelper.insert('user', ctx.request.body)
  //console.log(data);
  try {
    if (data.result.ok) {
      ctx.redirect('/')
    }
  } catch (err) {
    console.log(err)
    ctx.redirect('/add')
    return
  }
})

//编辑学员
router.get('/edit', async ctx => {
  //通过get传过来的id来获取用户信息
  // 这个id还需要经过DBhelper封装一下
  let id = ctx.query.id
  // find返回的都是对象数组
  let data = await DBHelper.find('user', { _id: DBHelper.getObjectId(id) })
  //获取用户信息
  await ctx.render('edit', {
    list: data[0]
  })
})

router.post('/doEdit', async ctx => {
  const id = ctx.request.body.id
  const username = ctx.request.body.username
  const age = ctx.request.body.age
  const sex = ctx.request.body.sex

  let data = await DBHelper.update(
    'user',
    { _id: DBHelper.getObjectId(id) },
    {
      username,
      age,
      sex
    }
  )

  try {
    if (data.result.ok) {
      ctx.redirect('/')
    }
  } catch (err) {
    console.log(err)
    ctx.redirect('/')
    return
  }
})

//删除学员
router.get('/delete', async ctx => {
  let id = ctx.query.id

  const data = await DBHelper.remove('user', { _id: DBHelper.getObjectId(id) })
  try {
    if (data.result.ok) {
      ctx.redirect('/')
    }
  } catch (err) {
    console.log(err)
    ctx.redirect('/')
    return
  }
})

app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())
app.listen(3000)
