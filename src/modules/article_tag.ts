import db from '../config/db';
import articleTagsSchema from '../schema/article_tag';
const ArticleTagsDbModel: any = db.model('article_attrs', articleTagsSchema);

interface ArticleTags {
  tagName: string;
  createDate?: number;
}



export default class ArticleTagsModel {
  static async create(tag: ArticleTags) {
    return await ArticleTagsDbModel({
      ...tag
    }).save();
  }

  static async creates(tagArr: Array<ArticleTags>) {
    return await ArticleTagsDbModel.insertMany(tagArr);
  }
  // 获取所有标签
  static async getTags() {
    return await ArticleTagsDbModel.find({}, {_id: 0});
  }
  static async findTag(tagName: string) {
    return await ArticleTagsDbModel.find({tagName}, {_id: 0});
  }
  static async findExitTags(tagNameArr: Array<string>) {
    return await ArticleTagsDbModel.find({tagName: {$in: tagNameArr}}, {_id: 0});
  }
  // 通过Id获
  static async findIdTag(tagId: string) {
    return await ArticleTagsDbModel.findOne({ id: tagId }, {_id: 0});
  }
  
}