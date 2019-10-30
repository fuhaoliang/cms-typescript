"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const article_tag_1 = require("../schema/article_tag");
const ArticleTagsDbModel = db_1.default.model('article_attrs', article_tag_1.default);
class ArticleTagsModel {
    static async create(tag) {
        return await ArticleTagsDbModel(Object.assign({}, tag)).save();
    }
    static async creates(tagArr) {
        return await ArticleTagsDbModel.insertMany(tagArr);
    }
    // 获取所有标签
    static async getTags() {
        return await ArticleTagsDbModel.find({}, { _id: 0 });
    }
    static async findTag(tagName) {
        return await ArticleTagsDbModel.find({ tagName }, { _id: 0 });
    }
    static async findExitTags(tagNameArr) {
        return await ArticleTagsDbModel.find({ tagName: { $in: tagNameArr } }, { _id: 0 });
    }
}
exports.default = ArticleTagsModel;
//# sourceMappingURL=article_tag.js.map