const express =require ('express');
const router =express.Router();
const ArticleCommunicationController = require('../controllers/Article/ArticleCommunication');

router.get  ('/',ArticleCommunicationController.getAllArticleCommunication);
router.post ('/',ArticleCommunicationController.postArticleCommunication);
router.get('/:id',ArticleCommunicationController.getArticleLikes);


module.exports = router;