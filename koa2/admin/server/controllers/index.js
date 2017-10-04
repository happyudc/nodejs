/**
 * Created by happyu on 2017/10/4.
 */
module.exports = async (ctx) => {
    const title = 'home';
    await ctx.render('index', {
        title
    })
}