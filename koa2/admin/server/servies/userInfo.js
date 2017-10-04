/**
 * Created by happyu on 2017/10/3.
 */

const validator = require('validator');
const userModel = require('../models/userInfo');

const user = {

    /**
     * 创建用户
     * @param user
     * @returns {Promise.<*|Promise>}
     */
    async create(user) {
        let result = await userModel.create(user);
        return result
    },

    /**
     * 查找存在的用户
     * @param formData 查询的表单数据
     * @returns {Promise.<*|Promise>}
     */
    async getExistUser(formData) {
        let resultData = await userModel.getExistUser({
            'email': formData.email,
            'name': formData.userName
        });
        return resultData
    },

    /**
     * 登陆
     * @param formData
     * @returns {Promise.<*|Promise>}
     */
    async signIn(formData) {
        let resultData = await userModel.getUserByNameAndPassword({
            "password": formData.password,
            "name": formData.userName
        });
        return resultData
    },

    /**
     * 根据用户吗查找用户信息
     * @param userName
     * @returns {Promise.<{email: (*|boolean|email|string|RegExp), userName, detailInfo: *, createTime: *}>}
     */
    async getUserInfoByName(userName) {
        let resultData = await userModel.getUserInfoByName(userName) || {}
        let userInfo = {
            email: resultData.email,
            userName: resultData.name,
            detailInfo: resultData.detail_info,
            createTime: resultData.create_time
        };
        return userInfo
    },

    validatorSignUp(userInfo) {
        let result = {
            success: false,
            message: '',
        };

        if(/[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false) {
            result.message = "用户吗必须是a-z0-9_-, 6～16位"
        }
        if(!validator.isEmail(userInfo.email)) {
            result.message = "email不合法";
        }
        if(!/[\w+]{6,16}/.test(userInfo.password)) {
            result.message = "密码不合法";
            return result
        }
        if(userInfo.password !== userInfo.confirmPassword) {
            result.message = "两次密码不一致";
            return result
        }
        result.success = true;
        return result
    }

};

module.exports = user;










































