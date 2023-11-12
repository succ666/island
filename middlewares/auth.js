const baseAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth{
    constructor() {
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
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }
}

module.exports = {Auth}