const express =require ('express');
const router =express.Router();
const ProductController = require('../controllers/Product.Controller');


//router.get('/',ProductController.getAllToken);
//Get all Product
router.get('/',ProductController.getAllProducts);
//Get Product By id 
router.get('/:id',ProductController.findProductById);
//Post Product
router.post('/',ProductController.PostProduct);
//update Product
router.patch('/:id',ProductController.UpdateProductById);
//delete product
router.delete('/:id',ProductController.DeleteProduct);


module.exports = router;