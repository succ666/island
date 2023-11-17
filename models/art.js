const { Sentence, Music, Movie} = require('./classic')
class Art{
    static async getData(artId, type) {
        let options = {where: {id: artId}}
            let art = null;
            switch(type) {
                case 100:
                    art = await Movie.findOne(options)
                    break;
                case 200:
                    art = await Music.findOne(options)
                    break;
                case 300:
                    art = await Sentence.findOne(options)
                    break;
                default:
                    break;
            }
            return art
    }
}

module.exports = {Art}
