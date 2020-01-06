"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const update_1 = require("../middlrware/update");
const common_1 = require("../controllers/common");
const user_1 = require("../controllers/user");
const article_1 = require("../controllers/article");
const article_tag_1 = require("../controllers/article_tag");
const router = new Router({
    prefix: '/api/v1'
});
// 公共方法
router.post('/upload', update_1.updateMiddlrware, common_1.CommonControllers.updatedImage);
// 用户接口
router.post('/user/register', user_1.UserController.create);
router.post('/user/login', user_1.UserController.login);
router.post('/user/logout', user_1.UserController.logout);
router.get('/user/userinfo', user_1.UserController.getUserInfo);
router.put('/user/:username', user_1.UserController.updateUserInfo);
router.delete('/user/delete', user_1.UserController.delUser);
// router.get('/user', UserController.jwtUserInfo);
// 文章接口
router.post('/article/create', article_1.ArticleController.create);
router.get('/article/:id', article_1.ArticleController.getArticleInfo);
router.delete('/article/delete', article_1.ArticleController.delArticle);
router.patch('/article/:id', article_1.ArticleController.pacthArticle);
// 文章聚合接口
router.get('/articles', article_1.ArticleController.getArticles);
router.get('/articles/count', article_1.ArticleController.getArticlesCount);
//根据标签id获取文章
router.get('/articles/:tagId', article_1.ArticleController.getArticlesByTagId);
// 文章标签
router.post('/tags/create', article_tag_1.ArticleTagsController.create);
router.post('/tags/creates', article_tag_1.ArticleTagsController.creates);
router.get('/tags', article_tag_1.ArticleTagsController.getTags);
// router.get('/tags/:id', ArticleTagsController.getTagById);
exports.default = router;
//# sourceMappingURL=index.js.map