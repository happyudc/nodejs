/**
 * Created by happyu on 2017/10/3.
 */

const router = require('koa-router')();

const api = require('./api');
const work = require('./work');
const admin = require('./admin');
const index = require('./index');
const home = require('./home');
const error = require('./error');

router.use('/', home.routes(), home.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/work', work.routes(), work.allowedMethods());
router.use('/error', error.routes(), error.allowedMethods());

module.exports = router;