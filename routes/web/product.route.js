// 解决方案产品页控制器
var prductController = require('../../controller/web/product.controller');

/**
 * 首页路由
 * @param {*} app
 */
module.exports = function(app) {
    // 智慧小程序
    app.get('/zhxcx', prductController.zhxcx);
    // 智能分销
    app.get('/znfx', prductController.znfx);
    //免押金租赁
    app.get('/myjzl', prductController.myjzl);
};