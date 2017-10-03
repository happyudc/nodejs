/**
 * Created by happyu on 2017/10/3.
 */

const Koa = require('koa');
const app = new Koa();

app.use( async (ctx) => {
    // 获取jsonp的请求为get
    if(ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {
        // 获取jsonp的callback
        let callbackName = ctx.query.callback || 'callback'
        let returnData = {
            success: true,
            data: {
                text: 'this is a jsonp api',
                time: new Date().getTime(),
            }
        };
        // jsonp 的script字符串
        let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`;

        //用text/javaScript，让他支持跨域获取
        ctx.type = 'text/javascript';

        // 输出jsonp字符串
        ctx.body = jsonpStr;
    } else {
        ctx.body = 'hello jsonp'
    }
});

app.listen(3000, () => {
    console.log('jsonp is starting at port 3000')
});