const bcrypt = require("bcryptjs");
const {sequelize} = require('../core/db')
const { Model, DataTypes } = require('sequelize')

class User extends Model{}

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