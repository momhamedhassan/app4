const express =require ('express');
const router =express.Router();
const DoctorController = require('../controllers/Doctor.Controller');
const {verifyAccessToken}=require('./../Database/jwt_helper')

//Get Doctor By id 
router.get('/get/:AgoraId',DoctorController.findDoctorById);
//Get all Doctor
router.get('/:doctorSpeciality',DoctorController.getAllDoctors);

//Post Doctor
router.post('/',DoctorController.PostDoctorInformation);
//update Doctor
router.patch('/:id',DoctorController.UpdateDoctorById);
//delete Doctor
router.delete('/:id',DoctorController.DeleteDoctor);

router.get('/getId/get',async(req,res,next)=>{
    const userId=req.payload.aud.replace(/['"]+/g, '');
    res.send(userId);
  
  })
module.exports = router;