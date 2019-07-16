// 经典案例控制器
var classicCaseController = require('../../controller/web/classicCase.controller');

/**
 * 经典案例路由
 * @param {*} app 
 */
module.exports = function(app) {
  // 经典案例
  app.get('/classicCase', classicCaseController.classicCase);
};