// mongo演示控制器
var mongoController = require('../../controller/web/mongo.controller');

/**
 * mongo演示路由
 * @param {*} app 
 */
module.exports = function(app) {
  // mongo演示新增页
  app.get('/mongo', mongoController.index);

  // mongo演示修改页
  app.get('/mongo/:id', mongoController.index);

  // 保存
  app.post('/mongo/save', mongoController.save);

  // 删除
  app.get('/mongo/delete/:id', mongoController.del);

  // 获取分页
  app.get('/mongo/pager/:pageindex/:pagesize', mongoController.pager);
};