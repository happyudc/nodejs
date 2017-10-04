/**
 * Created by happyu on 2017/10/4.
 */
const router = require('koa-router')();
const admin = require('../controllers/admin');

module.exports = router.get('/', admin.indexPage)
