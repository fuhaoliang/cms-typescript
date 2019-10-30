"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uuid = require('uuid/v1');
const articleTagsSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid()
    },
    tagName: {
        type: String,
        required: true
    },
    createDate: {
        type: Number,
        default: new Date().getTime()
    }
}, {
    versionKey: false
});
exports.default = articleTagsSchema;
//# sourceMappingURL=article_tag.js.map