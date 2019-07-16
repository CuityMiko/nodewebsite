/**
 * 首页控制器
 */

// 首页
var index = function(req, res, next) {
    res.render('web/home/index');
};

module.exports = {
    index
}