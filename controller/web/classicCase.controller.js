/**
 * 经典案例控制器
 */

 // 获取数据
var _productData = require('../../data/products.json');

// 经典案例
var classicCase = function(req, res, next) {
    res.render('web/classicCase/index',{
        model: {
            jdalData: _productData.jdalData
        }
    });
};

module.exports = {
    classicCase
}