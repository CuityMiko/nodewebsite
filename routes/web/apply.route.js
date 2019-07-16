// 表单页控制器
var applyController = require('../../controller/web/apply.controller');

/**
 * 表单路由
 * @param {*} app
 */
module.exports = function(app) {
    // 申请代理
    app.get('/agent', applyController.agent);
    // 保存
    app.post('/agent/save', applyController.save);
};