const baseAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth{
    constructor(level) {
        this.level = level
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }

    get m(){
        return async (ctx, next) => {
            const authRes = baseAuth(ctx.req)
            let decode;
            if(!authRes || !authRes.name){
                throw new global.error.Forbbiden('token不合法')
            }
            try {
                decode = jwt.verify(authRes.name, global.config.security.secretKey)
            }catch (error){
                if(error.name == 'TokenExpiredError'){
                    throw new global.error.Forbbiden('token已过期')
                }else{
                    throw new global.error.Forbbiden('token不合法')
                }
            }
            if(decode.scope < this.level){
                throw new global.error.Forbbiden("权限不足")
            }
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }
}

module.exports = {Auth}
