const express =require ('express');
const router =express.Router();
const AppointmentController = require('../controllers/Appointment.controller');

//router.get('/',ProductController.getAllToken);
//Get all Product
router.get('/',AppointmentController.getAllAppointments);
//Get Product By id 
router.get('/:id',AppointmentController.findAppointmentById);
//Post Product
router.post('/',AppointmentController.PostAppointment);

router.post('/addPatientAppointment/:SchaduleId',AppointmentController.PostPatientAppointment)
//update Product
router.patch('/:id',AppointmentController.UpdateAppointmentById);
//delete product
router.delete('/:id',AppointmentController.DeleteAppointment);
module.exports = router;