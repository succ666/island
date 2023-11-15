const { Model, DataTypes } = require('sequelize')
const {sequelize} = require('../core/db')

const classicFields = {
    image: DataTypes.STRING,
    content: DataTypes.STRING,
    pubdate: DataTypes.DATEONLY,
    fav_nums: DataTypes.INTEGER,
    title: DataTypes.STRING,
    type: DataTypes.TINYINT
}

class Movie extends Model {
}

Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})

class Sentence extends Model {
}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})

class Music extends Model {

}
Music.init({
    ...classicFields,
    url: DataTypes.STRING
},{
    sequelize,
    tableName: 'music'
})

module.exports = {
    Sentence,
    Music,
    Movie
}
