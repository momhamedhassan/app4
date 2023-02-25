const express =require ('express');
const router =express.Router();
const DoctorController = require('../controllers/Doctor.Controller');
const DoctorReviewController = require('../controllers/Review.Controller.js');


router.get('/Reviews',DoctorReviewController.getAllDoctorReviews);

router.post('/Reviews',DoctorReviewController.PostDoctorReview);
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