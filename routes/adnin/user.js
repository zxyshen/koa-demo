const Router = require('koa-router'),
  router = new Router()

// /admin/user
router.get('/', async ctx => {
  await ctx.render('admin/user/index')
})

// admin/user/edit
router.get('/edit', async ctx => {
  await ctx.render('admin/user/edit')
})

module.exports = router.routes()
