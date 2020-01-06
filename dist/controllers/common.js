"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const api_js_1 = require("../api.js");
const status_code_1 = require("../util/status-code");
// import { Context } from 'koa';
class CommonControllers {
    static async updatedImage(ctx) {
        // 上传单个文件
        try {
            const file = ctx.request.files.file; // 获取上传文件
            // 创建可读流
            const reader = fs.createReadStream(file.path);
            let filePath = path.join(__dirname, '../upload') + `/${file.name}`;
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok', { file: `${api_js_1.default.uploadUrl}/${file.name}` });
        }
        catch (err) {
            ctx.response.status = 412;
            ctx.body = status_code_1.statusCode.ERROR_412('上传失败');
        }
    }
}
exports.CommonControllers = CommonControllers;
//# sourceMappingURL=common.js.map