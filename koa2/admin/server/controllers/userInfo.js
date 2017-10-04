/**
 * Created by happyu on 2017/10/3.
 */

const userInfoService = require('../servies/userInfo');

module.exports = {
    /**
     * 用户登陆
     * @param ctx
     * @returns {Promise.<void>}
     */
    async signIn(ctx) {
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: null,
        };
        let userResult = await userInfoService.signIn(formData);

        if(userResult) {
            if(userResult.name) {
                result.success = true
            } else {
                result.message = "用户名或密码错误"
            }
        } else {
            result.message = "用户不存在"
        }
        if(result.success === true) {
            let session = ctx.session;
            session.isLogin = true;
            session.userName = userResult.name;
            session.userId = userResult.id

            console.log(session)

            ctx.redirect('/work')
        } else {
            ctx.body = result
        }
    },
    /**
     * 注册
     * @param ctx
     * @returns {Promise.<void>}
     */
    async signUp(ctx) {
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: null
        };

        let validateResult = userInfoService.validatorSignUp(formData);
        if(!validateResult.success) {
            result = validateResult;
            ctx.body = result;
            return
        }

        let existOne = await userInfoService.getExistUser(formData);
        if(existOne) {
            result.message = "用户已存在";
            ctx.body = result;
            return
        }

        let userResult = await userInfoService.create({
            email: formData.email,
            password: formData.password,
            name: formData.userName,
            create_time: new Date().getTime(),
            level: 1
        })

        // console.log(userResult.insertId) // 打印插入行的主键id

        if(userResult && userResult.insertId * 1 > 0) {
            result.success = true
        } else {
            result.message = "注册失败, 系统异常"
        }

        ctx.body = result

    }
}