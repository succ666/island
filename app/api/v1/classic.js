const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const {Flow} = require('../../../models/flow')

const { ParameterException } = require('../../../core/http-exception')
const {PositiveIntegerValidator} = require('../../../validator/validator')
const {Auth} = require('../../../middlewares/auth')

router.post('/latest',new Auth(8).m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [['index', 'DESC']]
    })
    ctx.body = flow
})

module.exports = router
