/**
 * 首页联系我们ContactInfo数据模型操作
 */
const mongodb = require('../core/mongoose.js');
const q = require('q');

// ContactInfo Schema 结构
let contactInfoSchema = new mongodb.mongoose.Schema({
    username         : {type : String},  // 姓名
    userphone        : {type : String},  // 手机号
    companyname      : {type : String},  // 公司名称
    created          : {type : String},  // 创建时间
});

/**
 * 获取列表
 */
contactInfoSchema.statics.getlist = () => {
    var deferred = q.defer();
    mongodb.db.model('ContactInfo').find({}).sort({'_id': -1}).exec((err, res) => {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(res);
    })
    return deferred.promise;
}

/**
 * 根据Id获取信息
 * @param {*} id 
 */
contactInfoSchema.statics.getById = (id) => {
    var deferred = q.defer();
    mongodb.db.model('ContactInfo').findOne({ _id: id}, (err, res) => {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(res);
    })
    return deferred.promise;
}

/**
 * 修改
 * conditions:查询条件
 * updated:修改内容
 */
contactInfoSchema.statics.modify = (conditions, updated) => {
    let _conditions = conditions;
    let _update = {$set : updated};
    let _options = {upsert : true};
    var deferred = q.defer();
    mongodb.db.model('ContactInfo').update(_conditions, _update, _options, (err, res) => {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(res);
    })
    return deferred.promise;
}

/**
 * 删除
 */
contactInfoSchema.statics.delete = (conditions) => {
    var deferred = q.defer();
    mongodb.db.model('ContactInfo').remove(conditions, (err, res) => {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(res);
    })
    return deferred.promise;
}


/**
 * 分页
 */
contactInfoSchema.statics.getPagedata = (conditions, pageindex, pagesize) => {
    let _start = (parseInt(pageindex) - 1) * parseInt(pagesize);
    let _contactInfoModel = mongodb.db.model('ContactInfo');
    let _result = _contactInfoModel.find(conditions);
    var deferred = q.defer();
    _result.sort({'created': -1}).skip(_start).limit(parseInt(pagesize)).exec((err, res) => {
        if (err)
            deferred.reject(err);
        else{
            _contactInfoModel.find(conditions).count((err, data) => {
                if (err)
                    deferred.reject(err);
                else
                    deferred.resolve({total: data, result: res});
            });
        }
    })
    return deferred.promise;
}

// 定义模型并指定Schema
let ContactInfoModel = mongodb.db.model('ContactInfo', contactInfoSchema);

module.exports = ContactInfoModel;