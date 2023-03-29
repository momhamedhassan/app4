const express =require ('express');
const router =express.Router();
const ArticleController = require('../controllers/Article/Article.Controller');

router.get  ('/',ArticleController.getAllArticles);
router.get('/:id',ArticleController.getArticleByID);
router.post ('/',ArticleController.postArticle);
router.patch('/:id',ArticleController.UpdateArticleById)


module.exports = router;