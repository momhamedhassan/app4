const express =require ('express');
const router =express.Router();
const DoctorController = require('../controllers/Doctor.Controller');
const DoctorReviewController = require('../controllers/Review.Controller.js');
const DoctorExperienceController=require('../controllers/Experience.Controller');

router.get    ('/Experience',DoctorExperienceController.getAllDoctorExperience);
router.get    ('/Experience/:id',DoctorExperienceController.findDoctorExperienceById);
router.post   ('/Experience',DoctorExperienceController.PostDoctorExperience);
router.delete ('/Experience/:id',DoctorExperienceController.DeleteDoctorExperience)
router.patch  ('/Experience/:id',DoctorExperienceController.UpdateDoctorExperienceById);

router.get('/Reviews',DoctorReviewController.getAllDoctorReviews);
router.get('/Reviews/:id',DoctorReviewController.findDoctorReviewById);
router.post('/Reviews',DoctorReviewController.PostDoctorReview);
router.delete('/Reviews/:id',DoctorReviewController.DeleteDoctorReview);
router.patch ('/Reviews/:id',DoctorReviewController.UpdateDoctorReviewById);

//router.get('/',ProductController.getAllToken);
//Get all Product
router.get('/',DoctorController.getAllDoctors);
//Get Product By id 
router.get('/:id',DoctorController.findDoctorById);
//Post Product
router.post('/',DoctorController.PostDoctor);
//update Product
router.patch('/:id',DoctorController.UpdateDoctorById);
//delete product
router.delete('/:id',DoctorController.DeleteDoctor);


module.exports = router;