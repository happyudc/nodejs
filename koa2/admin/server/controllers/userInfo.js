/**
 * Created by happyu on 2017/10/3.
 */

const userInfoService = require('../servies/userInfo');

module.exports = {
    async signIn(ctx) {
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: null,
        };
        let userResult = await userInfoService.signIn(formData);

        if(userResult) {
            if(formData.userName === userResult.name) {
                result.success = true
            } else {
                result.message = "用户名或密码错误"
            }
        } else {
            result.message = "用户不存在"
        }
        if(formData.source === 'form' && result.success === true) {
            let session = ctx.success;
            session.isLogin = true;
            session.userName = userResult.name;
            session.userId = userResult.id

            ctx.redirect('/work')
        } else {
            ctx.body = result
        }
    }
}