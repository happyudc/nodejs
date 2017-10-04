/**
 * Created by happyu on 2017/10/3.
 */
const allConfig = require('../../config');
const config = allConfig.database;
const mysql = require('mysql');
/**
 * 创建mysql连接池
 * @type {Pool}
 */
const pool = mysql.createPool({
    host: config.HOST,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
});

/**
 * 封装异步mysql查询
 * @param sql sql语句
 * @param params 查询条件参数
 * @returns {Promise}
 */
let query = function (sql, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                resolve(err)
            } else {
                let query = connection.query(sql, params, (err, rows) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
                console.log(query.sql); // 打印sql
            }
        })
    })
};

/**
 * 创建表
 * @param sql
 * @returns {Promise}
 */
let createTable = function (sql) {
    return query(sql, [])
};

/**
 * 根据主键id查询数据
 * @param tables 表名称 []
 * @param id
 * @returns {Promise}
 */
let findDataById = function (tables, id) {
    let _sql = "select * from ?? where id = ?";
    return query(_sql, [ tables, id ])
};

/**
 * 分页查询
 * @param tables 表名称 []
 * @param columns 需要查询的列名
 * @param start 起始页码
 * @param end 结束页码
 * @returns {Promise}
 */
let findDataByPage = function (tables, columns, start, end) {
    let _sql = "select ?? from ?? limit ? , ?";
    return query(_sql, [ columns, tables, start, end ])
};

/**
 * 添加数据
 * @param table
 * @param values {}
 * @returns {Promise}
 */
let insertData = function (table, values) {
    let _sql = "insert into user_info SET ?"; // 这种方式(SET ?)可以拿到插入的主键id
    return query(_sql, values)
};

/**
 * 根据主键id修改数据
 * @param table
 * @param columns
 * @param id
 * @returns {Promise}
 */
let updateData = function (table, columns, id) {
    let _sql = "update ?? set ? where id = ?";
    return query(_sql, [ table, columns, id ])
}

/**
 * 根据主键id删除数据
 * @param table
 * @param id
 * @returns {Promise}
 */
let deleteDataById  = function (table, id) {
    let _sql = "delete from ?? where id ?";
    return query(_sql, [ table, id ])
};

/**
 * 查询指定列
 * @param table
 * @param keys
 * @returns {Promise}
 */
let select=  function (table, columns) {
    let _sql = "select ?? from ??";
    return query(_sql, [ columns, table ])
};


/**
 * 查询count
 * @param table
 * @returns {Promise}
 */
let count = function (table) {
    let _sql = "select count(*) as total_count from ??";
    return query(_sql, [ table ])
}

module.exports = {
    query,
    createTable,
    findDataById,
    findDataByPage,
    deleteDataById,
    updateData,
    select,
    insertData,
    select,
    count
}





















