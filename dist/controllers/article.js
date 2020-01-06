"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_code_1 = require("../util/status-code");
const article_1 = require("../modules/article");
const article_tag_1 = require("../modules/article_tag");
const uuid = require('uuid/v1');
class ArticleController {
    // 创建
    static async create(ctx) {
        let atricle = ctx.request.body;
        const { tagArr } = ctx.request.body;
        let newTagNameArr = [];
        let dbTagNameArr = [];
        atricle = Object.assign(Object.assign({}, atricle), { id: uuid() });
        const dbTagArr = await article_tag_1.default.getTags() || [];
        for (let item of dbTagArr) {
            dbTagNameArr.push(item.tagName);
        }
        tagArr.forEach((itemName) => {
            if (!dbTagNameArr.includes(itemName))
                newTagNameArr.push({ tagName: itemName });
        });
        await article_tag_1.default.creates(newTagNameArr);
        let newatricle = await article_1.default.create(atricle);
        if (newatricle) {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok', {
                id: newatricle.id
            });
        }
        else {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.ERROR_412('创建失败');
        }
    }
    // 删除
    static async delArticle(ctx) {
        const { id } = ctx.query;
        let { n } = await article_1.default.delArticle(id);
        if (n === 1) {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok');
        }
        else {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.ERROR_412('删除失败');
        }
    }
    // 修改
    static async pacthArticle(ctx) {
        const { id } = ctx.params;
        const { tagArr = [] } = ctx.request.body;
        // 判断是否有新标签
        let newTagNameArr = [];
        let dbTagNameArr = [];
        const dbTagArr = await article_tag_1.default.getTags() || [];
        for (let item of dbTagArr) {
            dbTagNameArr.push(item.tagName);
        }
        tagArr.forEach((itemName) => {
            if (!dbTagNameArr.includes(itemName))
                newTagNameArr.push({ tagName: itemName });
        });
        await article_tag_1.default.creates(newTagNameArr);
        // 数据
        const articleObj = ctx.request.body;
        const { n } = await article_1.default.updateArticle(id, articleObj);
        if (n === 1) {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok');
        }
        else {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.ERROR_412('修改失败');
        }
    }
    // 获取
    static async getArticleInfo(ctx) {
        let { id } = ctx.params;
        let article = await article_1.default.updateViewArticle(id);
        console.info('article=--->', article);
        if (article) {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok', { articleObj: article });
        }
        else {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.ERROR_412('未发现文章');
        }
    }
    // 条件查询
    static async getArticles(ctx) {
        let query = JSON.parse(JSON.stringify(ctx.query));
        let limit = query.pagesize - 0 || 20; //分页参数
        let currentPage = query.page - 0 || 1; //当前页码
        let skip = (currentPage - 1) * limit;
        let sort = JSON.parse(query.sort || '{}');
        delete query.pagesize;
        delete query.page;
        delete query.total;
        delete query.sort;
        // 去除空查询
        for (let key in query) {
            if (query[key] === '' || query[key] === '[]' || query[key] === '{}')
                delete query[key];
        }
        let { modifyDate, tagArr } = query;
        if (modifyDate) {
            modifyDate = JSON.parse(modifyDate);
            query.modifyDate = {
                $gt: modifyDate[0] || 0,
                $lt: modifyDate[1] ? modifyDate[1] + 24 * 60 * 60 * 1000 : new Date().getTime()
            };
        }
        if (tagArr) {
            tagArr = JSON.parse(tagArr);
            query.tagArr = {
                $in: tagArr
            };
        }
        let [articles, totalCount] = await Promise.all([article_1.default.findAtricles(query, sort, limit, skip), article_1.default.findAtriclesAllCount(query)]);
        ctx.response.status = 200;
        ctx.body = status_code_1.statusCode.SUCCESS_200('ok', {
            data: articles,
            pageObj: {
                pagesize: limit,
                page: currentPage,
                total: totalCount
            }
        });
    }
    // 获取文章全量信息
    static async getArticlesCount(ctx) {
        let [totalCount = 0, puliceCount = 0, tagArr = []] = await Promise.all([article_1.default.findAtriclesAllCount({}), article_1.default.findAtriclesAllCount({ public: 1 }), article_tag_1.default.getTags()]);
        ctx.response.status = 200;
        ctx.body = status_code_1.statusCode.SUCCESS_200('ok', {
            totalCount,
            puliceCount,
            tagArr
        });
    }
    // 通过标签id获取文章
    static async getArticlesByTagId(ctx) {
        // 通过id 获取标签
        const { tagId } = ctx.params;
        const tagObj = await article_tag_1.default.findIdTag(tagId);
        if (tagObj) {
            const { tagName } = tagObj;
            let query = JSON.parse(JSON.stringify(ctx.query));
            let limit = query.pagesize - 0 || 20; //分页参数
            let currentPage = query.page - 0 || 1; //当前页码
            let skip = (currentPage - 1) * limit;
            let sort = JSON.parse(query.sort || '{}');
            delete query.pagesize;
            delete query.page;
            delete query.total;
            delete query.sort;
            query.tagArr = { $in: [tagName] };
            let [articles, totalCount] = await Promise.all([article_1.default.findAtricles(query, sort, limit, skip), article_1.default.findAtriclesAllCount(query)]);
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok', {
                data: articles,
                pageObj: {
                    pagesize: limit,
                    page: currentPage,
                    total: totalCount
                }
            });
        }
        else {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.ERROR_412('未发现文章');
        }
    }
}
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.js.map