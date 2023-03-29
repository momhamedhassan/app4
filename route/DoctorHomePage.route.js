const express =require ('express');
const router =express.Router();
const DoctorHomePageController = require('../controllers/DoctorHomePage.controller');


router.get('/:id',DoctorHomePageController.getDoctorHomePage);
module.exports = router;
