/**
 * 关于控制器
 */

var _compFigureData = require('../../data/comp-figure.json');
// console.log(_compFigureData);

// 关于我们
var index = function(req, res, next) {
    res.render('web/about/index',{
        model:{
            compFigure:_compFigureData.compFigure
        }
    });
};

module.exports = {
    index
}