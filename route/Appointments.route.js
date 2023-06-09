const express =require ('express');
const router =express.Router();
const {verifyPayment}=require('./../Database/jwt_helper')
const AppointmentController = require('../controllers/Appointment.controller');
const PaymentController = require('../controllers/Payment.controller');

router.get   ('/accept/:appointmentId',AppointmentController.DoctorAcceptAppointment);
router.get   ('/waitingReq/',AppointmentController.findWaitingAppointment);
router.get   ('/Payment/',PaymentController.postPayment);
router.get   ('/Canceled/',AppointmentController.getCanceledAppointments);
router.get   ('/Cancel/:appointmentId',AppointmentController.doctorCancelAppointment);

// Patient Get accepted appointment
router.get   ('/accepted/',AppointmentController.getAcceptedAppointments);
//Get Appointment By id 
router.get   ('/:id',AppointmentController.findAppointmentById);



router.get   ('/GetPatientAppointments/:patientId',AppointmentController.findAppointmentByPateintId);
//make appointment
router.post  ('/',verifyPayment,AppointmentController.PostAppointment);
//Doctor add prescribtion
router.post  ('/addPrescribtion/',AppointmentController.addPrescribtionAppointment);
// Doctor accept Appointment

//update Appointment
router.patch ('/:id',AppointmentController.UpdateAppointmentById);
//delete product
router.delete('/:id',AppointmentController.DeleteAppointment);

module.exports = router;