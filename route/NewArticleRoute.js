const express =require ('express');
const router =express.Router();
const ArticleController=require('../controllers/NewArticle.controller')
const controller=require('./../controllers/Article/Article.Controller')

router.get('/',ArticleController.getAllArticles);
router.post('/',ArticleController.PostArticle);
router.get('/:articleId',ArticleController.getArticleById)

module.exports = router;