const express =require ('express');
const router =express.Router();
const SchaduleController = require('../controllers/PateintSchadule.Controller');

router.get('/',SchaduleController.getAllPatientScadule);
//Get all Product
router.get('/:id',SchaduleController.getSchaduleById);
// //Get Product By id 
// router.get('/:id',SchaduleController.);
// //Post Product
 router.post('/',SchaduleController.PostSchadule);
// //update Product
 router.patch('/patchPills/:id',SchaduleController.PatchSchadulePills);
 router.patch('/patchActivities/:id',SchaduleController.PatchSchaduleActivities);
 router.delete('/deletePill/:SchaduleId/:PillId',SchaduleController.deletePill);
 
 router.delete('/deleteActivity/:SchaduleId/:ActivityId',SchaduleController.deleteActivity);
 
 //router.patch('/',SchaduleController.patchPills);
// //delete product
// router.delete('/:id',SchaduleController.);
module.exports = router;