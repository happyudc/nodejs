/**
 * Created by happyu on 2017/10/4.
 */

const router = require('koa-router')();

module.exports = router.get('*', async (ctx) => {
    const title = 'error';
    await ctx.render('error', {
        title
    })
})