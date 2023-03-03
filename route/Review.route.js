const express =require ('express');
const router =express.Router();
const DoctorReviewController = require('../controllers/Review.Controller.js');


router.get    ('/',DoctorReviewController.getAllDoctorReviews);
router.get    ('/:id',DoctorReviewController.findDoctorReviewById);
router.post   ('/',DoctorReviewController.PostDoctorReview);
router.delete ('/:id',DoctorReviewController.DeleteDoctorReview);
router.patch  ('/:id',DoctorReviewController.UpdateDoctorReviewById);

module.exports = router;