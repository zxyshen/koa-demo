/*
  路由的主入口在这个文件夹下，也就是未来的最高级目录下的app.js

  一、首先说一下路由和视图层级目录结构(不考虑前端渲染后端渲染)
    主要就是routes和views；
    routers的主要功能
    1.负责分配路由
    2.负责再次抓取数据，比如第一次进入/的时，index截取/后是需要再用
    app.get(api)去拉取通用接口的吧  (ps: 这个是我猜想的)
    3.负责从views中选择对应的模版返回给用户(render的时候可以传数据)
    4.当逻辑比较复杂时routers就需要从controller中选取对应的service来处理路由，
    让service去拉取数据，然后再render或者直接返回body。

    routers的结构划分是没问题的，最外层首先要有个api(通用接口)，api负责把路由交给
    对应的service，让service拉取通用数据然后返回body。

    然后就是index，负责截取/(默认主页)，然后从api拉取首屏数据后(我觉得这里不需要
    劳烦service了吧)，根据路由层级从views/default 中依次render模版

    最后就是各个大页面的主控制路由(例如负责截取/admin的admin)，然后分配给
    各自的子路由(routes/admin)去处理。处理步骤如上。



  二、再来讲讲前端渲染下的目录结构
  当前端渲染下，还选用koa作为服务器的话，目录结构应该是这样子的
  build --- webpack config
  config --- 关于项目的配置
  server --- koa
  sql --- 一些sql文件
  src --- 前台目录
  static --- 静态文件(相对于server的)
  其实也就比以前的vue项目也就多了一个server文件夹，server文件夹的目录结构是这样子的
  config --- 服务器的全局配置
  controller --- 控制器
  routes --- 路由
  models --- 模型
  不需要任何模版，也就是说不需要views并且ctx一律只返回body。即ctx.body = {data}



  三、最后是后端渲染的结构
  config --- 服务器的全局配置
  controller --- 控制器
  routes --- 路由
  models --- 模型
  views --- 模版
  这个就是后端渲染的结构了，至于具体如何用的，继续往后学吧。
  
*/ 



const Koa = require('koa'),
  Router = require('koa-router'),
  render = require('koa-art-template'),
  path = require('path'),
  router_admin = require('./routes/admin'),
  router_index = require('./routes/index'),
  router_api = require('./routes/api'),
  app = new Koa(),
  router = new Router()

// 配置模版引擎
render(app, {
  // views路径
  root: path.join(__dirname, 'views'),
  // 扩展名
  extname: '.html',
  // 是否开启调试
  debug: process.env.NODE_ENV !== 'prodection'
})

// 对/admin的请求使用router_admin提供的路由 对/api ...
router
  .use('/', router_index)
  .use('/admin', router_admin)
  .use('/api', router_api)

// 挂载路由模块
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
