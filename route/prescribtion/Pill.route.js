const express =require ('express');
const router =express.Router();
const PillController = require('../../controllers/Prescribtion/Pill.controller')


//Get all pills
router.get('/',PillController.getAllPills);
//Get Appointment By id 
router.get('/:id',PillController.findPillById);
//make pill
router.post('/',PillController.AddPill);
//update Pill
router.patch('/:id',PillController.UpdatePillById);
//delete Pill
router.delete('/:id',PillController.DeletePill);
module.exports = router;