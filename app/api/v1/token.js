const Router = require('koa-router')
const {loginType} = require("../../../lib/enum")
const {generateToken} = require('../../../core/util')
const router = new Router({
    prefix: '/v1'
})
const {TokenValidator} = require('../../../validator/validator')
const User = require('../../../models/user')
const {WXManager} = require('../../../services/wx')
router.post('/', async (ctx, next) => {
    const v = await new TokenValidator().validate(ctx)
    // throw new global.error.Success()
    let token = null
    switch (parseInt(v.get('body.type'))){
        case loginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break;
        case loginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.code'))
            break;
        default:
            throw new global.error.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        token
    }
})

async function emailLogin(account, secret){
    const user = await User.verifyEmailPassword(account, secret)
    return generateToken(user.id, 8)
}
module.exports = router
