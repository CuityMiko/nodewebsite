/**
 * 表单数据模型操作
 */
const mongodb = require('../core/mongoose.js');
const q = require('q');

// applyInfo Schema 结构
let applyInfoSchema = new mongodb.mongoose.Schema({
    applyName         : {type : String},  // 申请人姓名
    applyPhone        : {type : String},  // 申请人手机号
    selprovince       : {type : String},  // 申请人区域-省
    selcity           : {type : String},  // 申请人区域-市
    selarea           : {type : String},  // 申请人区域-区/县
    companyName       : {type : String},  // 公司名称
    companyAddress    : {type : String},  // 公司地址
    companySituation  : {type : String}  // 公司概况
});

// 定义模型并指定Schema
let ApplyInfoModel = mongodb.db.model('ApplyInfo', applyInfoSchema);

module.exports = ApplyInfoModel;