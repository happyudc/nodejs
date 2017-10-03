/**
 * Created by happyu on 2017/10/3.
 */

/**
 * 时间格式化
 * @param fmt 格式化的格式
 * @param date 时间
 */
export function dateFormat(fmt, date) {
    let dateEnum = {
        "M+": date.getMonth() + 1,   // 月份
        "d+": date.getDate(),        // 日
        "h+": date.getHours(),       // 小时
        "m+": date.getMinutes(),     // 分
        "s+": date.getSeconds(),     // 秒
        "S+": date.getMilliseconds() // 毫秒
    }
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear + "").substr(4-RegExp.$1.length))
    }
    for(let k in dateEnum) {
        if(new RegExp("("+ k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1)
                ? (dateFormat[k])
                : (("00"+ dateFormat[k]).substr((""+ dateFormat[k]).length)));
        }
    }
    return fmt
}