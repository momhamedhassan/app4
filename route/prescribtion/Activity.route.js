const express =require ('express');
const router =express.Router();
const ActivityController = require('../../controllers/Prescribtion/Activity.controller')


//Get all appointment
router.get('/',ActivityController.getAllActivities);
//Get Activity By id 
router.get('/:id',ActivityController.findActivityById);

//make activity
router.post('/',ActivityController.AddActivity);

//update activity
router.patch('/:id',ActivityController.UpdateActivityById);
//delete activity
router.delete('/:id',ActivityController.DeleteActivity);
module.exports = router;