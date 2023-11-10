const Router = require('koa-router')
const router = new Router()
const { ParameterException } = require('../../../core/http-exception')
const {PositiveIntegerValidator} = require('../../../validator/validator')

router.post('/v1/:id/classic/latest',async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx)

    const path = ctx.params
    const query = ctx.request.query
    const headers = ctx.request.header
    const body = ctx.request.body


    ctx.body = {classic: 'latest'}
})

module.exports = router
