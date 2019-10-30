"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.default = ArticleModel;
//# sourceMappingURL=article.js.map