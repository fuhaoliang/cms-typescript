"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const api_1 = require("../api");
console.info(api_1.default);
const cmsBaseUrl = api_1.default.mongodbUrl;
console.info('mongodbUrl---->', cmsBaseUrl);
mongoose.connect(cmsBaseUrl, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', err => {
    console.info('数据库连接失败', err);
});
db.once('open', () => {
    console.info('连接数据库');
});
exports.default = db;
//# sourceMappingURL=db.js.map