const express =require ('express');
const router =express.Router();
const TokenController = require('../controllers/token.Controller');


router.get('/',TokenController.getAllToken);



module.exports = router;