const express =require ('express');
const router =express.Router();
const PatientController=require('../controllers/Patient.Controller');


router.post    ('/',PatientController.PostPatient);
//router.get    ('/:id',PatientController.findDoctorExperienceById);
//router.post   ('/',PatientController.PostDoctorExperience);
//router.delete ('/:id',PatientController.DeleteDoctorExperience)
//router.patch  ('/:id',PatientController.UpdateDoctorExperienceById);
module.exports = router;