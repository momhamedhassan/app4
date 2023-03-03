const express =require ('express');
const router =express.Router();
const DoctorExperienceController=require('../controllers/Experience.Controller');


router.get    ('/',DoctorExperienceController.getAllDoctorExperience);
router.get    ('/:id',DoctorExperienceController.findDoctorExperienceById);
router.post   ('/',DoctorExperienceController.PostDoctorExperience);
router.delete ('/:id',DoctorExperienceController.DeleteDoctorExperience)
router.patch  ('/:id',DoctorExperienceController.UpdateDoctorExperienceById);
module.exports = router;