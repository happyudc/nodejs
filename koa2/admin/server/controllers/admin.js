/**
 * Created by happyu on 2017/10/4.
 */
module.exports = {
    async indexPage (ctx) {
        const title = 'admin page';
        await ctx.render('admin', {
            title
        })
    }
}