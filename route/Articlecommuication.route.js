const express =require ('express');
const router =express.Router();
const ArticleCommunicationController = require('../controllers/Article/ArticleCommunication');
router.get('/',ArticleCommunicationController.getAllArticleCommunication);
router.get  ('/:id',ArticleCommunicationController.getArticleCommunicationById);
router.post ('/',ArticleCommunicationController.postArticleCommunication);
router.get('/articleLikes/:id',ArticleCommunicationController.getArticleLikes);
router.get('/AddCommunicationLike/:id',ArticleCommunicationController.patchArticleLikes);
router.patch('/patchCommunicationComments/addComment/:id',ArticleCommunicationController.AddComment);
router.delete('/patchCommunicationComments/deleteComment/:ArticleCommunicatioId/:CommentId',ArticleCommunicationController.deleteComment);
router.delete('/patchCommunicationLikes/deleteLike/:ArticleCommunicatioId',ArticleCommunicationController.Dislike);



module.exports = router;