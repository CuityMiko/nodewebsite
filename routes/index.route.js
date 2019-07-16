/**
 * 路由模块
 * @param {*} app
 */
module.exports = function (app) {
    // 首页路由
    require('./web/home.route')(app);
    // 关于我们路由
    require('./web/about.route')(app);
    // 解决方案产品路由
    require('./web/classicCase.route')(app);
    // 解决方案产品路由
    require('./web/product.route')(app);
    // mongodb 演示路由
    require('./web/mongo.route')(app);
    // 申请代理 演示路由
    require('./web/apply.route')(app);
};