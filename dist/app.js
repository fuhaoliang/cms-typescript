"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const json = require("koa-json");
const jwt = require("koa-jwt");
const index_1 = require("./routes/index");
const error_1 = require("./middlrware/error");
const secret_1 = require("./config/secret");
const cros = require('@koa/cors');
const path = require('path');
const app = new Koa();
app.use(cros());
// middlrware
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(error_1.default());
// let pathUrl =  path.join(__dirname, '../')
app.use(require('koa-static')(__dirname, './upload'));
// error处理
// token认证
app.use(jwt({ secret: secret_1.default.sign }).unless({
    path: [
        // 上传图片
        /^\/upload/,
        /^\/api\/v1\/upload/,
        // 文章详情
        /^\/api\/v1\/article\/detail/,
        // 文章列表
        /^\/api\/v1\/article\/list/,
        // 登录
        /^\/api\/v1\/user\/login/,
        // 创建用户
        /^\/api\/v1\/user\/register/,
        // 分类列表
        /^\/api\/v1\/category\/list/,
        // 文章搜索
        /^\/api\/v1\/article\/search/,
        // 分类
        /^\/api\/v1\/category\/article\/list/,
        // 创建文章
        /^\/api\/v1\/article/,
        /^\/api\/v1\/tags/,
        // 查询
        /^\/api\/v1\/articles/,
        //文章标签
        /^\/api\/v1\/tags/
    ]
}));
// router控制
app.use(index_1.default.routes());
app.use(index_1.default.allowedMethods());
exports.default = app;
//# sourceMappingURL=app.js.map