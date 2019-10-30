"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_code_1 = require("../util/status-code");
const article_tag_1 = require("../modules/article_tag");
const uuid = require('uuid/v1');
class ArticleTagsController {
    static async create(ctx) {
        let { tagName } = ctx.request.body;
        const isExit = await article_tag_1.default.findTag(tagName);
        console.info('isExit', isExit);
        if (isExit) {
            ctx.body = status_code_1.statusCode.ERROR_412('标签已存在');
            return;
        }
        const tags = await article_tag_1.default.create({ tagName });
        if (tags) {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok', {
                id: tags.id,
                tagName: tags.tagName,
            });
        }
        else {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.ERROR_412('添加标签失败');
        }
    }
    static async creates(ctx) {
        const { tagArr } = ctx.request.body;
        let tagNameArr = [];
        for (let item of tagArr) {
            tagNameArr.push(item.tagName);
        }
        const isExit = await article_tag_1.default.findExitTags(tagNameArr);
        // 判定是否多创建了标签
        if (isExit.length !== 0) {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.ERROR_412('标签已存在');
            return;
        }
        const result = await article_tag_1.default.creates(tagArr);
        if (result) {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok', {
                tagArr: result
            });
        }
        else {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.ERROR_412('添加标签失败');
        }
    }
    static async getTags(ctx) {
        const tagArr = await article_tag_1.default.getTags();
        if (tagArr) {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok', {
                tagArr
            });
        }
        else {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.ERROR_412('获取标签信息失败');
        }
    }
}
exports.ArticleTagsController = ArticleTagsController;
//# sourceMappingURL=article_tag.js.map