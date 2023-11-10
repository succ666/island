const Router = require('koa-router')
const router = new Router({
    prefix: '/v1'
})
const { RegisterValidator } = require('../../../validator/validator')

router.post('/register', (ctx, next) => {
    const v = new RegisterValidator().validate(ctx)
    ctx.body = 'success'
})

module.exports = router
