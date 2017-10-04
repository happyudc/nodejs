/**
 * Created by happyu on 2017/10/4.
 */
const router = require('koa-router')();
const controller = require('../controllers/work');

const routers = router.get('/', controller.indexPage)

module.exports = routers;