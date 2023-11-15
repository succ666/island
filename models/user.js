const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {sequelize} = require('../core/db')
const { Model, DataTypes } = require('sequelize')

class User extends Model{
    static async verifyEmailPassword(email, password){
        const user = await User.findOne({
            where: {email}
        })
        if(!user){
            throw new global.error.AuthFailed('账号不存在')
        }
        const correct = bcrypt.compareSync(password, user.password)
        if(!correct){
            throw new global.error.AuthFailed('密码不正确')
        }
        return user
    }

    static async getUserByOpenid(openid){
        const user = await User.findOne({
            where: { openid }
        })
       return user
   }

    static async registerByOpenid(openid){
        const user = await User.create({ openid })
        return user
   }

    static async verifyToken(token){
       try{
           await jwt.verify(token, global.config.security.secretKey)
           return true
       }catch (error){
           return false
       }
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    password:{
        type:  DataTypes.STRING,
        set(val){
            const salt = bcrypt.genSaltSync(10)
            const pwd = bcrypt.hashSync(val, salt)
            this.setDataValue('password', pwd)
        }
    },
    openid: {
        type: DataTypes.STRING(64),
        unique: true
    }
},{sequelize, tableName: 'user'})

module.exports = User
