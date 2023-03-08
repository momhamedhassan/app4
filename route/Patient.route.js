const express =require ('express');
const router =express.Router();
const PatientController=require('../controllers/Patient.Controller');


router.post    ('/',PatientController.PostPatient);
router.get    ('/',PatientController.getAllPatients);
router.get    ('/:id',PatientController.getAPatientById);
//router.post   ('/',PatientController.PostDoctorExperience);
router.delete ('/:id',PatientController.DeletePatientById);
router.patch  ('/:id',PatientController.UpdatePatientById);
module.exports = router;