const express =require ('express');
const router =express.Router();
const PrescribtionController = require('../controllers/Prescribtion.Controller');

//router.get('/',ProductController.getAllToken);
//Get all Product
router.get('/',PrescribtionController.getAllPrescribtions);
//Get Product By id 
router.get('/:id',PrescribtionController.findPrescribtionById);
//Post Product
router.post('/',PrescribtionController.postPrescribtion);
//update Product
router.patch('/:id',PrescribtionController.UpdatePrescribtionById);
//delete product
router.delete('/:id',PrescribtionController.DeletePrescribtion);
module.exports = router;