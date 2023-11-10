const {sequelize} = require('../core/db')
const { Sequeline, Model, DataTypes } = require('sequelize')

class User extends Model{

}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    openid: {
        type: DataTypes.STRING(64),
        unique: true
    }
},{sequelize, tableName: 'user'})
