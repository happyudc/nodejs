/**
 * Created by happyu on 2017/10/3.
 */
const router = require('koa-router')();
const userInfoController = require('../controllers/userInfo');

const routers = router.post('/user/signIn.json', userInfoController.signIn)

module.exports = routers
