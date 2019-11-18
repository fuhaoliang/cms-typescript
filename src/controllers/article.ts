
import { statusCode } from '../util/status-code';
import { Context } from 'koa';
import ArticleModel from '../modules/article';
import ArticleTagsModel from '../modules/article_tag';

const uuid = require('uuid/v1');

interface Article {
  id?: string;
  banner?: string;
  summary?: string;
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

interface ArticleTags {
  tagName: string;
  modifyDate?: number;
}

export class ArticleController {
  // 创建
  static async create(ctx: Context) {
    let atricle: Article = ctx.request.body;
    const { tagArr } = ctx.request.body;
    let newTagNameArr:Array<ArticleTags> = []
    let dbTagNameArr:Array<string> = [];
    atricle = {
      ...atricle,
      id: uuid()
    };
    const dbTagArr = await ArticleTagsModel.getTags() || []
    for (let item of dbTagArr) {
      dbTagNameArr.push(item.tagName);
    }
    tagArr.forEach((itemName: string) => {
      if (!dbTagNameArr.includes(itemName)) newTagNameArr.push({ tagName: itemName })
    });

    await ArticleTagsModel.creates(newTagNameArr)

    let newatricle: Article =  await ArticleModel.create(atricle);
    if (newatricle) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok', {
        id: newatricle.id
      });
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('创建失败');
    }
  }
  // 删除
  static async delArticle(ctx: Context) {
    const { id } = ctx.query;
    let { n } = await ArticleModel.delArticle(id);
    if (n === 1) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok');
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('删除失败');
    }
  }
  // 修改
  static async pacthArticle(ctx: Context) {
    const { id } = ctx.params;
    const { tagArr = [] } = ctx.request.body;
    // 判断是否有新标签
    let newTagNameArr:Array<ArticleTags> = []
    let dbTagNameArr:Array<string> = [];
    const dbTagArr = await ArticleTagsModel.getTags() || []
    for (let item of dbTagArr) {
      dbTagNameArr.push(item.tagName);
    }
    tagArr.forEach((itemName: string) => {
      if (!dbTagNameArr.includes(itemName)) newTagNameArr.push({ tagName: itemName })
    });
    await ArticleTagsModel.creates(newTagNameArr)
    // 数据
    const articleObj: Article = ctx.request.body;
    const { n } = await ArticleModel.updateArticle(id, articleObj);
    if (n === 1) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok');
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('修改失败');
    }
  }
  // 获取
  static async getArticleInfo(ctx: Context) {
    let { id } = ctx.params;
    let article: Article = await ArticleModel.updateViewArticle(id);
    console.info('article=--->', article)
    if (article) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok', { articleObj: article });
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('未发现文章');
    }
  }
  // 条件查询
  static async getArticles(ctx: Context){
    let query = JSON.parse(JSON.stringify(ctx.query))
    let limit = query.pagesize - 0 || 20; //分页参数
    let currentPage = query.page - 0 || 1; //当前页码
    let skip = (currentPage- 1) * limit
    let sort = JSON.parse(query.sort || '{}')
    delete query.pagesize
    delete query.page
    delete query.total
    delete query.sort
    // 去除空查询
    for (let key in query) {
      if (query[key] === '' || query[key] === '[]' || query[key] === '{}') delete query[key]
    }

    let { modifyDate, tagArr } = query
    if (modifyDate) {
      modifyDate = JSON.parse(modifyDate)
      query.modifyDate = {
        $gt: modifyDate[0] || 0,
        $lt: modifyDate[1] ? modifyDate[1] + 24 * 60 * 60 * 1000 : new Date().getTime()
      }
    }
    if (tagArr) {
      tagArr = JSON.parse(tagArr)
      query.tagArr = {
        $in: tagArr
      }
    }
    let [articles, articleAll] =  await Promise.all([ArticleModel.findAtricles(query, sort, limit, skip), ArticleModel.findAtriclesAll(query)])
    ctx.response.status = 200;
    ctx.body = statusCode.SUCCESS_200('ok', {
      data: articles,
      pageObj: {
        pagesize: limit,
        page: currentPage,
        total: articleAll.length
      }
    });
  }
  // 获取文章全量信息
  static async getArticlesCount (ctx: Context) {
    let [totalCount = 0, puliceCount = 0, tagArr = []] = await Promise.all([ArticleModel.findAtriclesAllCount({}), ArticleModel.findAtriclesAllCount({public: 1}), ArticleTagsModel.getTags()])
    ctx.response.status = 200;
    ctx.body = statusCode.SUCCESS_200('ok', {
      totalCount,
      puliceCount,
      tagArr
    });
  }
}