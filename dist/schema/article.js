"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// 字段级别索引
const articlesSchema = new mongoose.Schema({
    // 文章id
    id: {
        type: String,
        index: true
    },
    // 封面图
    banner: {
        type: String,
        default: ''
    },
    // 文章标题
    title: {
        type: String,
        required: true
    },
    // 内容
    content: {
        type: String,
        required: true
    },
    // 文章链接
    articleLink: {
        type: String
    },
    // 是否可评论
    isCommit: {
        type: Boolean,
        default: true
    },
    // 发布时间手动/自动类型
    timeDateType: {
        type: String,
        default: '1'
    },
    // 发布时间
    timeDate: {
        type: Number,
        default: () => new Date().getTime(),
        index: true
    },
    // 创建时间
    createDate: {
        type: Number,
        default: () => new Date().getTime(),
        index: true
    },
    // 修改时间
    modifyDate: {
        type: Number,
        default: () => new Date().getTime(),
        index: true
    },
    // 浏览人数
    views: {
        type: Number,
        default: 0
    },
    // 标签
    tagArr: {
        type: Array,
        default: []
    },
    // 发布
    public: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false
});
//schama级别索引
exports.default = articlesSchema;
//# sourceMappingURL=article.js.map