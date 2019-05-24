import db from '../config/db';
import articlesSchema from '../schema/article';
const ArticleDbModel: any = db.model('articles', articlesSchema);

interface Article {
  id?: string;
  banner?: string;
  title?: string;
  content?: string;
  articleLink?: string;
  isCommit?: boolean;
  timeDateType?: string;
  timeDate?: number;
  createDate?: number;
  modifyDate?: number;
  views?: number;
  tagArr?:Array<string>;
  [propName: string]: any;

}

interface Sort {
  timeDate?: number;
  createDate?: number;
  modifyDate?: number;
  views?: number;
}
export default class ArticleModel {
  static async create(article: Article) {
    return ArticleDbModel({ ...article }).save();
  }
  static async findArticle(option: Article) {
    return ArticleDbModel.findOne(option,{_id: 0});
  }
  static async findAtricles(option: Article, sort: Sort, limit:number , skip: number) {
    return ArticleDbModel.find(option, {_id: 0}).sort(sort).limit(limit).skip(skip)
  }
  static async findAtriclesAll(option: Article) {
    return ArticleDbModel.find(option, {_id: 0})
  }
  static async findAtriclesAllCount(option: Article) {
    return ArticleDbModel.find(option, {_id: 0}).countDocuments()
  }
  static async updateArticle(id: string, option: Article) {
    return ArticleDbModel.updateOne({ id }, { ...option });
  }
  static async delArticle(id: string) {
    return ArticleDbModel.deleteOne({ id });
  }
}
