const {LinValidator, Rule} = require('../core/lin-validator')
const {validatorType, loginType} = require('../lib/enum')
const User = require('../models/user')
class PositiveIntegerValidator extends LinValidator{
    constructor() {
        super();
        this.id = [
            new Rule( type.IS_INT, '需要是正整数',{min: 1})
        ]
    }
}
class RegisterValidator extends LinValidator{
    constructor() {
        super();
        this.email = [
            new Rule(validatorType.IS_EMAIL, '不符合Email规范'),
        ]
        this.password1 = [
            new Rule(validatorType.IS_LENGTH, '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule(validatorType.MATCHES,'密码不符合规范','^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule(validatorType.IS_LENGTH, '昵称不符合长度规范',{
                min: 4,
                max: 32
            })
        ]
    }

    validatePassword(vals){
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if(psw1 !== psw2){
            throw new Error('两个密码必须相同')
        }
    }

    async validateEmail(vals){
        const email = vals.body.email
         const v = await User.findOne({
            where: {email}
        })
        if(v){
            throw new Error('此邮箱已经被注册了！')
        }
    }
}
class TokenValidator extends LinValidator{
    constructor() {
        super();
        this.account = [
            new Rule(validatorType.IS_LENGTH, '不符合账号规则',{
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            new Rule(validatorType.IS_OPTIONAL),
            new Rule(validatorType.IS_LENGTH, '至少6个字符',{
                min: 6,
                max: 128
            })
        ]
    }
    validateType(vals){
        const type = vals.body.type
        if(!loginType.isThisType(type)){
            throw new Error('登录类型不合法')
        }
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator
}
