/**
 * Created by happyu on 2017/10/3.
 */
const dbUtils = require('../utils/dbUtils');

const user = {
    /**
     * 创建用户
     * @param model 用户数据模型
     * @returns {Promise} sql执行结果
     */
    async create ( model ) {
        let result = await dbUtils.insertData('user_info', model);
        return result
    },

    /**
     * 查找一个存在的用户
     * @param params 查找条件
     * @returns {Promise}
     */
    async getExistUser(params) {
        let _sql = ` select * from user_info where email = "${params.email}" or name="${params.name}"`;
        let result = await dbUtils.query(_sql);
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        } else {
            result = null
        }
        return result
    },

    /**
     * 根据用户名和密码查询用户
     * @param params
     * @returns {Promise}
     */
    async getUserByNameAndPassword(params) {
        let _sql = `select * from user_info where password="${params.password}" and name="${params.name}"`;
        console.log(_sql)
        let result = await dbUtils.query(_sql);
        console.log(result)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        } else {
            result = null;
        }
        return result
    },

    async getUserInfoByName (name) {
        let columns = ['id', 'email', 'name', 'detail_info', 'create_time', 'modified_time', 'modified_time' ];
        let _sql = "select ?? from ?? where name = ?";
        let result = await dbUtils.query(_sql, [columns, 'user_info', name]);
        if(Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    }
};

module.exports = user