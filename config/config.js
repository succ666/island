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
        expiresIn: 60*60*24
    }
}
