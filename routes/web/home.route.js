// 首页控制器
var homeController = require('../../controller/web/home.controller');

/**
 * 首页路由
 * @param {*} app 
 */
module.exports = function(app) {
  // 首页
  app.get('/', homeController.index);
};