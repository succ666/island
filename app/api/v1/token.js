const Router = require('koa-router')
const {loginType} = require("../../../lib/enum")
const router = new Router({
    prefix: '/v1'
})
const {TokenValidator} = require('../../../validator/validator')
const User = require('../../../models/user')

router.post('/', async (ctx, next) => {
    const v = await new TokenValidator().validate(ctx)
    // throw new global.error.Success()
    switch (parseInt(v.get('body.type'))){
        case loginType.USER_EMAIL:
            await emailLogin(v.get('body.account'), v.get('body.secret'))
            break;
        case loginType.USER_MINI_PROGRAM:
            break;
        default:
            throw new global.error.ParameterException('没有相应的处理函数')
    }
})

async function emailLogin(account, secret){
    const user = await User.verifyEmailPassword(account, secret)
    return user
}

module.exports = router