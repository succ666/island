const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const {Flow} = require('../../../models/flow')
const {Favor} = require('../../../models/favor')
const { ParameterException } = require('../../../core/http-exception')
const {PositiveIntegerValidator, DetailValidator} = require('../../../validator/validator')
const {Auth} = require('../../../middlewares/auth')
const {Art} = require('../../../models/art')
/**
 * 获取最新一期
 */
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
/**
 * 获取下一期
 */
router.get('/:index/next', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const flow = await Flow.findOne({
        where: {
            index: v.get('path.index') + 1
        }
    })

    if(!flow){
        throw new global.error.NotFound()
    }
    let art = await Art.getData(flow.art_id, flow.type)
    let likeStatus = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status', likeStatus ? 1: 0)
    ctx.body = art
})
/**
 * 获取上一期
 */
router.get('/:index/previous', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const flow = await Flow.findOne({
        where: {
            index: v.get('path.index') - 1
        }
    })
    if(!flow){
        throw new global.error.NotFound()
    }
    let art = await Art.getData(flow.art_id, flow.type)
    let likeStatus = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status', likeStatus ? 1: 0)
    ctx.body = art
})
/**
 * 获取当前期详情
 */
router.get('/details',new Auth().m, async (ctx,next) => {
    const v = await new DetailValidator().validate(ctx)
    let artId = v.get('query.id'),
        type = v.get('query.type')
    let art = await Art.getData(artId, type)
    if(!art){
        throw new global.error.NotFound()
    }
    let likeStatus = await Favor.userLikeIt(artId, type, ctx.auth.uid)
    let flow = await Flow.findOne({
        where :{
            'art_id': artId,
            type
        }
    })
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status', likeStatus ? 1: 0)
    ctx.body = art
})


module.exports = router
