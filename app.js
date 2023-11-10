const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const exception = require('./middlewares/exception')

const app = new Koa()

// require('./models/user')

app.use(parser())
app.use(exception)

InitManager.initCore(app)

app.listen(3000)
