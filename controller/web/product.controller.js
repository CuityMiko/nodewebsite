/**
 * 解决方案-产品控制器
 */

// 获取数据
var _productData = require('../../data/products.json');

// 智慧小程序
var zhxcx = function(req, res, next) {
    res.render('web/products/zhxcx', {
        model: {
            zhxcxData: _productData.zhxcxData,
            fwkhData: _productData.fwkhData
        }
    });
};

// 智能分销
var znfx = function(req, res, next) {
    res.render('web/products/znfx', {
        model: {
            znfxData: _productData.znfxData,
            fwkhData: _productData.fwkhData
        }
    });
};

// 免押金租赁
var myjzl = function(req, res, next) {
    res.render('web/products/myjzl', {
        model: {
            myjzlData: _productData.myjzlData,
            fwkhData: _productData.fwkhData
        }
    });
};

module.exports = {
    //智慧小程序
    zhxcx,
    //智能分销
    znfx,
    //免押金租赁
    myjzl
}