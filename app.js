var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressLayouts = require('express-ejs-layouts'); // layout for html
var app = express();

// view模板引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(expressLayouts);
// 指定全局的模板页面
app.set('layout', 'web/_layout/root')

app.use(logger('dev'));

// 指定post请求方式
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 指定cookie
app.use(cookieParser());

// 指定静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'resource')));

// session持久化配置
app.use(session({
  secret: "ky_website",
  key: "ky_website",
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},// 超时时间
  saveUninitialized: true,
  resave: false,
}));

// 允许访问api的时候cors跨域（允许同域名不同端口号之间的跨域）
// 当工程作为API接口对外提供时，实现允许跨域访问
app.use((req, res, next)=>{
  // 增加了cors跨域的请求头
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
})

// 路由
require('./routes/index.route')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('web/error/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('web/error/error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;