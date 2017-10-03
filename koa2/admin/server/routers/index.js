/**
 * Created by happyu on 2017/10/3.
 */

const router = require('koa-router')();

const api = require('./api');

router.use('/api', api.routes(), api.allowedMethods())

module.exports = router