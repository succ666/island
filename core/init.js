const requireDirectory = require("require-directory");
const Router = require("koa-router");

class InitManager {
    static initCore(app){
        InitManager.initRouterRoutes(app)
        InitManager.loadHttpException()
        InitManager.loadConfig()
    }
    static initRouterRoutes(app){
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module,apiDirectory, {
            visit: whenLoadModule
        })
        // 路由注册
        function whenLoadModule(obj) {
            if(obj.router && obj.router instanceof Router){
                app.use(obj.router.routes())
            }else if(obj instanceof Router){
                app.use(obj.routes())
            }
        }
    }
    static loadHttpException(){
        const errorDirectory = `${process.cwd()}/core/http-exception.js`
        const error = require(errorDirectory)
        global.error = error
    }
    static loadConfig(){
        const configPath = `${process.cwd()}/config/config`
        const config = require(configPath)
        global.config = config
    }

}
module.exports = InitManager
