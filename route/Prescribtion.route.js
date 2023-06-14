const express =require ('express');
const router =express.Router();
const PrescribtionController = require('../controllers/Prescribtion.Controller');


//Get all Prescribtion
router.get('/',PrescribtionController.getAllPrescribtions);
//Get Prescribtion By id 
router.get('/:id',PrescribtionController.findPrescribtionById);
//Post Prescribtion
router.post('/',PrescribtionController.postPrescribtion);
//update Prescribtion
router.patch('/:appointmentId',PrescribtionController.UpdatePrescribtionById);
//delete Prescribtion
router.delete('/:id',PrescribtionController.DeletePrescribtion);

router.get('/CompletedPill/:appointmentId/:pillId',PrescribtionController.CompletedPill);
router.delete('/deletePill/:prescribtionId/:PillId',PrescribtionController.deletePill);


router.delete('/deleteActivity/:prescribtionId/:ActivityId',PrescribtionController.deletActivity);

router.patch('/addTurn/:appointmentId/:pillId',PrescribtionController.AddTurn);
module.exports = router;