/**
 * mongo演示控制器
 */
let ContactInfoModel = require('../../model/contactinfo.model.js');

// mongo演示
var index = function(req, res, next) {
    var _id = req.params.id || '';
    var _title = _id == '' ? '新增' : '修改';
    if (_id == '') { // 新增
        res.render('web/mongo/index', {
            model: {
                title: _title
            }
        });
    } else { // 修改
        // 根据ID获取
        ContactInfoModel.getById(_id).then((result) => {
            res.render('web/mongo/index', {
                model: {
                    title: _title,
                    contactinfo: result
                }
            });
        }, (err) => {
            res.render('web/mongo/index', {
                model: {
                    title: '新增'
                }
            });
        })
    }
};

// 保存数据
var save = function(req, res, next) {
    var _id = req.body.id || '';
    if (_id == '') { // 新增
        let contactinfo = {
            username: req.body.username || '',
            userphone: req.body.userphone || '',
            companyname: req.body.companyname || '',
            created: (new Date()).getTime()
        }
        ContactInfoModel.create(contactinfo).then((result) => {
            res.json({ success: true });
        }).catch((err) => {
            console.log(err);
            res.json({ success: false });
        })
    } else { // 修改
        ContactInfoModel.modify({_id: req.body.id}, {username: req.body.username, userphone: req.body.userphone, companyname: req.body.companyname, updated: (new Date()).getTime()})
        .then((result) => {
            res.json({ success: true });
        }).catch((err) => {
            console.log(err);
            res.json({ success: false });
        })
    }
};

/**
 * 删除
 */
var del = (req, res) => {
    ContactInfoModel.delete({ _id: req.params.id })
    .then((result) => {
        res.json({ success: true, msg: '删除成功' });
    }).catch((err) => {
        console.log(err);
        res.json({ success: false, msg: '删除失败' });
    })
}

// 获取分页数据
var pager = (req, res) => {
    let _pageindex = req.params.pageindex;
    let _pagesize = req.params.pagesize;
    ContactInfoModel.getPagedata({}, _pageindex, _pagesize).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = {
    index,
    save,
    del,
    pager
}