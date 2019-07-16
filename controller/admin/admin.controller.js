/**
 * 后台管理
 */

// 首页
var index = function(req, res) {
    res.render('admin/index', {
        model: {
            title: '后台首页'
        }
    });
};

module.exports = {
    index
}
