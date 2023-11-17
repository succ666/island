module.exports = {
    // prod
    environment: 'dev',
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456'
        // password: '12345678'
    },
    security: {
        secretKey: 'abcdefg',
        expiresIn: 60*60*24*30
    },
    wx: {
        appid: 'wx15b31cb88c7f99f6',
        appSecret: '5221d8f858e6c6764eb75b36cb5b2592'
    }
}
