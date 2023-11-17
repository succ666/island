const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const {Flow} = require('../../../models/flow')

const { ParameterException } = require('../../../core/http-exception')
const {PositiveIntegerValidator} = require('../../../validator/validator')
const {Auth} = require('../../../middlewares/auth')
const {Art} = require('../../../models/art')

router.post('/latest',new Auth(8).m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [['index', 'DESC']]
    })
    let art = await Art.getData(flow.art_id, flow.type)
    art.setDataValue('index',flow.index)
    ctx.body = art
})

module.exports = router
