const koaBody = require('koa-body');

export const updateMiddlrware = koaBody({
  multipart: true,
  formidable: {
    keepExtensions: true, // 保持文件的后缀
    maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
});