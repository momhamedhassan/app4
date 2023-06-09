const express =require ('express');
const router =express.Router();
const SchaduleController = require('../controllers/PateintSchadule.Controller');

router.get('/',SchaduleController.getAllPatientScadule);
router.get('/:id',SchaduleController.getSchaduleById);
router.post('/',SchaduleController.PostSchadule);
router.delete('/:id',SchaduleController.deleteSchadule);
router.patch('/patchSchadule/:PatientId',SchaduleController.addSchadule);

 //patching Pills
 router.patch('/patchPills/:id',SchaduleController.PatchSchadulePills);
 router.delete('/deletePill/:SchaduleId/:PillId',SchaduleController.deletePill);

//patching Appointment
 router.patch('/addAppointment/:SchaduleId',SchaduleController.addAppointment);
 router.delete('/deleteAppointment/:SchaduleId/:appointmentId',SchaduleController.deleteAppointment);

//patching Activity
 router.patch('/patchActivities/:id',SchaduleController.PatchSchaduleActivities);
 router.delete('/deleteActivity/:SchaduleId/:ActivityId',SchaduleController.deleteActivity);
 

module.exports = router;