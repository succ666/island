const { Model, DataTypes } = require('sequelize')
const {sequelize} = require('../core/db')
const {Art} = require('./art')

class Favor extends Model{
    // 业务表
    static async like(artId, type, uid){
        const favor = await Favor.findOne({
            where: {
                artId, type, uid
            }
        })
        if(favor){
            throw new global.error.LikeError()
        }
        const t = await sequelize.transaction();
        try{
            await Favor.create({ artId, type, uid}, { transaction: t })
            let art = await Art.getData(artId, type)
            await art.increment('fav_nums',{by: 1, transaction: t})
            await t.commit();
        }catch (e){
            await t.rollback();
        }
    }
    static async dislike(artId, type, uid){
        const favor = await Favor.findOne({
            where: {
                artId, type, uid
            }
        })
        if(!favor){
            throw new global.error.DislikeError()
        }
        const t = await sequelize.transaction();
        try{
            await favor.destroy({
                force: true,
                transaction: t
            })
            const art = await Art.getData(artId, type)
            await art.decrement('fav_nums',{by: 1, transaction: t})
            await t.commit();
        }catch (e){
            await t.rollback();
        }
    }

    static async userLikeIt(artId,type, uid){
        const favor = await Favor.findOne({
            where: {
                artId,type, uid
            }
        })
        return !!favor
    }

}

Favor.init({
    uid: DataTypes.INTEGER,
    artId: DataTypes.INTEGER,
    type: DataTypes.INTEGER
},{
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}
