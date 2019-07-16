/**
 * mongodb数据库连接
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// 配置文件
const config = require('../config/site_config.js');

// 数据库名称
const dbname = 'ky_website'

// 数据库
let mongourl = config.mongodburl + dbname;

// 创建数据库连接
const db = mongoose.createConnection(mongourl);

// 链接错误
db.on('error',(err) => {
    console.log(`mongodb connect error! error message：${err}`);
});

// 连接成功
db.once('open', () => {
    console.log('mongodb connect success!')
});

module.exports={mongoose, db}