const Router = require('koa-router'),
  router = new Router()

// api/todo
router.get('/todo', async ctx => {
  ctx.body = "这是todo-api"
})

// api/user
router.get('/user', async ctx => {
  ctx.body = "这是user-api"
})


module.exports = router.routes()
