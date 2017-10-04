/**
 * Created by happyu on 2017/10/4.
 */
const router = require('koa-router')();
const index = require('../controllers/index');
module.exports = router.get('/', index)