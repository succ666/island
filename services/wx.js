const axios = require('axios')
const User = require('../models/user')
const {generateToken} = require('../core/util')
const {Auth} = require('../middlewares/auth')


class WXManager{
    static async codeToToken(code){
        const {data:{ errcode, errmsg, openid, session_key}} = await axios.get(`
        https://api.weixin.qq.com/sns/jscode2session?appid=${global.config.wx.appid}&secret=${global.config.wx.appSecret}&js_code=${code}&grant_type=authorization_code`)
        if(errcode || errmsg){
            throw new global.error.Forbbiden(`errcode:${errcode},errmsg: ${errmsg}`)
        }
        let user = await User.getUserByOpenid(openid)
        if(!user){
            user = await User.registerByOpenid(openid)
        }
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {WXManager}
