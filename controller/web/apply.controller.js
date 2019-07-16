/**
 * 表单控制器
 */

let ApplyInfoModel = require('../../model/apply.model.js');

// 申请代理
var agent = function(req, res, next) {
    res.render('web/apply/agent');
};

// 保存数据
var save = function(req, res, next) {
    let applyInfo = {
        applyName: req.body.applyName || '',
        applyPhone: req.body.applyPhone || '',
        selprovince: req.body.selprovince || '',
        selcity: req.body.selcity || '',
        selarea: req.body.selarea || '',
        companyName: req.body.companyName || '',
        companyAddress: req.body.companyAddress || '',
        companySituation: req.body.companySituation || '',
        created: (new Date()).getTime()
    };
    ApplyInfoModel.create(applyInfo).then((result) => {
        res.json({ success: true });
    }).catch((err) => {
        console.log(err);
        res.json({ success: false });
    })
};

module.exports = {
    agent,
    save
}