const Router = require('koa-router'),
  router = new Router()

router.get('/', async ctx => {
  await ctx.render('default/index')
})

// /about  因为index已经挂载的是/路由所以这里不能加/也就是说不能用/about
router.get('about', async ctx => {
  await ctx.render('default/about')
})

module.exports = router.routes()
