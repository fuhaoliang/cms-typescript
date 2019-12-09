"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: your name
 * @Date: 2019-11-18 21:54:24
 * @LastEditTime: 2019-11-19 00:26:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cms-typescript/src/modules/article.ts
 */
const db_1 = require("../config/db");
const article_1 = require("../schema/article");
const ArticleDbModel = db_1.default.model('articles', article_1.default);
class ArticleModel {
    static async create(article) {
        return ArticleDbModel(Object.assign({}, article)).save();
    }
    static async findArticle(option) {
        return ArticleDbModel.findOne(option, { _id: 0 });
    }
    static async findAtricles(option, sort, limit, skip) {
        return ArticleDbModel.find(option, { _id: 0 }).sort(sort).limit(limit).skip(skip);
    }
    static async findAtriclesAll(option) {
        return ArticleDbModel.find(option, { _id: 0 });
    }
    static async findAtriclesAllCount(option) {
        return ArticleDbModel.find(option, { _id: 0 }).countDocuments();
    }
    static async updateArticle(id, option) {
        return ArticleDbModel.updateOne({ id }, Object.assign({}, option));
    }
    static async delArticle(id) {
        return ArticleDbModel.deleteOne({ id });
    }
    static async updateViewArticle(id) {
        return ArticleDbModel.findOneAndUpdate({ id }, {
            $inc: {
                views: 1 //每次自增长1
            }
        }, {
            new: true //设置true 获取的是更新之后的值
        });
    }
}
exports.default = ArticleModel;
//# sourceMappingURL=article.js.map