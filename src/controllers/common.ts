const fs = require('fs');
const path = require('path');
import appUrl from '../api.js';
import { statusCode } from '../util/status-code';
// import { Context } from 'koa';
export class CommonControllers {
  static async updatedImage(ctx: any) {
    // 上传单个文件
    try {
      const file = ctx.request.files.file; // 获取上传文件
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      const type = file.type.split('/')[1]
      let filePath: string = path.join(__dirname, '../../upload') + `/${file.name}.${type}`;
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok', { file: `${appUrl.uploadUrl}/${file.name}.${type}` });
    } catch (err) {
      ctx.response.status = 412;
      ctx.body = statusCode.ERROR_412('上传失败');
    }
  }
}