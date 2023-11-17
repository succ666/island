const Router = require('koa-router')
const {Auth} = require("../../../middlewares/auth");
const {Favor} = require("../../../models/favor")
const {LikeValidator} = require("../../../validator/validator");

const router = new Router({
    prefix: '/v1'
})

router.post('/like', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx)
    await Favor.like(v.get('body.artId'),v.get('body.type'),ctx.auth.uid)
    throw new global.error.Success()
})

module.exports = router
