## 快赢官网
### 采用nodejs + express进行Web框架开发

## 项目初始化
- 运行方式：

``` bash
# Clone project
git clone http://gitlab.cloudrelation.com/cuitongyang/ky_website.git

# global install bower
npm install bower -g

# Install dependencies
npm install
or
# 建议不要用cnpm  安装有各种诡异的bug  可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# static resources install
bower install

# serve with hot reload at localhost:8090
npm start

# Into Browser
http://localhost:3001
```

- 1. node路由获取参数方式：
```
// req.body.id post提交方式获取参数
// req.params.id restful方式获取参数
// req.query.id ?方式获取参数
```