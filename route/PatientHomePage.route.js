const express =require ('express');
const router =express.Router();
const PatientHomePageController=require('../controllers/PatientHomePage.controller');


router.get('/:id',PatientHomePageController.getPatientHomePage);

module.exports = router;