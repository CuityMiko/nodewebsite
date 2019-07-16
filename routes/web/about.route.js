// 关于我们控制器
var aboutController = require('../../controller/web/about.controller');

/**
 * 首页路由
 * @param {*} app
 */
module.exports = function(app) {
    // 首页
    app.get('/about', aboutController.index);
};