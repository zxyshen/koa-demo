const Router = require('koa-router'),
  router = new Router()

// /admin/swiper
router.get('/', async ctx => {
  await ctx.render('admin/swiper/index')
})

// admin/swiper/edit
router.get('/switch', async ctx => {
  await ctx.render('admin/swiper/switch')
})

module.exports = router.routes()
