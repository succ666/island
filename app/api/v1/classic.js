const Router = require('koa-router')
const router = new Router({
    prefix: '/v1'
})

const { ParameterException } = require('../../../core/http-exception')
const {PositiveIntegerValidator} = require('../../../validator/validator')
const {Auth} = require('../../../middlewares/auth')

router.post('/classic/latest',new Auth(8).m, async (ctx, next) => {
    // const v = await new PositiveIntegerValidator().validate(ctx)
    // const path = ctx.params
    // const query = ctx.request.query
    // const headers = ctx.request.header
    // const body = ctx.request.body
    // ctx.body = {classic: 'latest'}
    ctx.body = ctx.auth
})

module.exports = router
