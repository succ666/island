const Router = require('koa-router')
const router = new Router({
    prefix: '/v1'
})
const {TokenValidator} = require('../../../validator/validator')

router.post('/login', async (ctx, next) => {
    const v = await new TokenValidator().validate(ctx)
    throw new global.error.Success()
})

module.exports = router