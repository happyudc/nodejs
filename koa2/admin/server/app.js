/**
 * Created by happyu on 2017/10/3.
 */
const path = require('path');
const Koa = require('koa');
const convert = require('koa-convert');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

const config = require('../config');
const routers = require('./routers/index');

const app = new Koa();

// session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST
};

// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}));

// 配置日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname, '../static')
));

// 配置服务端模板引擎中间件
app.use(views(path.join(__dirname, '.views'),{
    extension: 'ejs'
}));

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(3001, function () {
    console.log('the server is starting at port 3001')
});


