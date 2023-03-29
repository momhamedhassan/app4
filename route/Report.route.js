const express =require ('express');
const router =express.Router();
const ReportController = require('../controllers/Report.Controller');

//router.get('/',ProductController.getAllToken);
//Get all Product
router.get('/',ReportController.getAllReports);
//Get Product By id 
router.get('/:id',ReportController.UpdateReportById);
//Post Product
router.post('/',ReportController.PostReport);
//update Product
router.patch('/:id',ReportController.UpdateReportById);
//delete product
router.delete('/:id',ReportController.DeleteReport);
module.exports = router;