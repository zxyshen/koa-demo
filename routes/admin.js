const Router = require('koa-router'),
  router = new Router(),
  router_user = require('./adnin/user'),
  router_swiper = require('./adnin/swiper')

// /admin
router.get('/', async ctx => {
  ctx.body = '后台管理系统'
})

// /admin/user ---- /admin/swiper
router.use('/user', router_user).use('/swiper', router_swiper)

module.exports = router.routes()
