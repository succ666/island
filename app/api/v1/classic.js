const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const {Flow} = require('../../../models/flow')
const {Favor} = require('../../../models/favor')
const { ParameterException } = require('../../../core/http-exception')
const {PositiveIntegerValidator} = require('../../../validator/validator')
const {Auth} = require('../../../middlewares/auth')
const {Art} = require('../../../models/art')

router.post('/latest',new Auth(8).m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [['index', 'DESC']]
    })
    let likeStatus = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    let art = await Art.getData(flow.art_id, flow.type)
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status', likeStatus ? 1: 0)
    ctx.body = art
})

module.exports = router
