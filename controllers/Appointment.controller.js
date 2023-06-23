const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Appointment =require('../Models/Appointment.Model');
const DoctorModel=require('../Models/Doctor.Model')
const PatientModel=require('../Models/Patient.Model')
const PatientSchaduleModel =require('../Models/SchadulePage/Schadule.Model');
const Prescribtion=require('../Models/Prescribtion.Model');
const { error } = require('@hapi/joi/lib/base');
const prescribtion = require('../Models/Prescribtion.Model');
const AgoraUser=require('./../Models/AgoraUser')
const Doctor=require('./../Models/Doctor.Model');
const Patient = require('../Models/Patient.Model');
const Pill = require('../Models/Prescribtion/Pill.Model');
const Activity = require('../Models/Prescribtion/Activity.Model');
const appointment = require('../Models/Appointment.Model');
const admin=require('firebase-admin');
const fcm=require('@diavrank/fcm-notification');
const serviceAccount=require('./../final-project-agora-firebase-adminsdk-bnzot-b86370206b.json')
require('dotenv').config();

  
  
  const nocache = (_, resp, next) => {
      resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      resp.header('Expires', '-1');
      resp.header('Pragma', 'no-cache');
      next();
    }

module.exports=
{findAppointmentByPateintId:async(req,res,next)=>{
    console.log("hello from find appointment by patient id")
    const userId=req.payload.aud.replace(/['"]+/g, '');

    try {
    const appointment =await Appointment.find({Patient:userId,Done: true})
    .populate({
        path:'Prescribtion',
        model:Prescribtion,
       
        select:{__v:0,PatientId:0,DoctorId:0,Appointment:0},
        populate:{
            path:'NextAppointment',
            model:Appointment,
            select:{__v:0,Patient:0,Prescribtion:0},
            },
                populate:{
                path:'Pills.pillId',
                model:Pill,
                select:{__v:0},
                }
        })
    .populate({
            path:'Prescribtion',
            model:Prescribtion,
            select:{__v:0,PatientId:0,DoctorId:0,Appointment:0},
            
            
                populate:{
                    path:'remainingPills.pillId',
                    model:Pill,
                    select:{__v:0},
                    },
                    populate:{
                        path:'Activities.ActivityId',
                        model:Activity,
                        select:{__v:0},
                        }
        })
    .populate({
                        path:'Prescribtion',
                        model:Prescribtion,
                        select:{__v:0,PatientId:0,DoctorId:0,Appointment:0},
                        
                        
                            populate:{
                                path:'remainingPills.pillId',
                                model:Pill,
                                select:{__v:0},
                                },
                                populate:{
                                    path:'NextAppointment',
                                    model:Appointment,
                                    select:{__v:0},
                                    }
                                
        })
    

    .exec();
    console.log(appointment)
  
   if(!appointment){
    throw createError(404,"Appointment does not exist")

   }
  
    res.send(appointment)
} catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid Appointment id"))
        return;
    }
    next(error);
}},

findWaitingAppointment:async (req,res,next)=>{
    console.log('hello from waiting')
    const userId=req.payload.aud.replace(/['"]+/g, '');
    console.log(userId);
    try {
        console.log('.... hello from waiting appointment req ....');
        const UserType=await AgoraUser.findById(userId)

        console.log(UserType);
        console.log(UserType.userType);

            if(UserType.userType==1){

                console.log('patient');
                const results = await Appointment.find({Patient:userId,accepted:false,canceled:false}).populate({
                    path:'Doctor',
                    model:AgoraUser,
                    select:{__v:0,access_token:0,created_at:0,expire_date:0,token:0,type:0,password:0,userType:0,email:0},
                    }).exec();
                res.send(results)
            }else if(UserType.userType){
                console.log('Doctor');
                const results = await Appointment.find({Doctor:userId,accepted:false,canceled:false},{Doctor:0}).populate({
                    path:'Patient',
                    model:AgoraUser,
                    select:{__v:0,access_token:0,created_at:0,expire_date:0,token:0,type:0,password:0,userType:0,email:0},
                    }).exec();
                res.send(results)
            }else{throw createError(404,"invalid UserType ")}
    } catch (error) {
        console.log(error.message);
    }
}


,
getAcceptedAppointments:async (req,res,next)=>{
    const userId=req.payload.aud.replace(/['"]+/g, '');
    console.log(userId);


    try {


        console.log('... hello from accepted appointment...')
        console.log(userId);
      
        const UserType=await AgoraUser.findById(userId)
            console.log(UserType);
        console.log(UserType.userType);
        if(UserType.userType==1){
            console.log('patient');
            const results = await Appointment.find({Patient:userId,accepted:true,Done:false},{Patient:0,__v:0}).populate({
                path:'Doctor',
                model:AgoraUser,
                select:{__v:0,access_token:0,created_at:0,expire_date:0,token:0,type:0,password:0,userType:0,email:0},
                }).exec();
            res.send(results)
        }else if(UserType.userType){
            console.log('Doctor');
            const results = await Appointment.find({Doctor:userId,accepted:true,Done:false},{Doctor:0}).populate({
                path:'Patient',
                model:AgoraUser,
                select:{__v:0,access_token:0,created_at:0,expire_date:0,token:0,type:0,password:0,userType:0,email:0},
                }).exec();
            res.send(results)
        }else{throw createError(404,"invalid UserType ")}


        
       
        
    } catch (error) {
        console.log(error.message);
    }


},
getCanceledAppointments:async (req,res,next)=>{
    const userId=req.payload.aud.replace(/['"]+/g, '');
    console.log(userId);
    try {
        console.log('... hello from cancelled appointment...')
        console.log(userId);
      
        const UserType=await AgoraUser.findById(userId)
        console.log(UserType);
    console.log(UserType.userType);
    if(UserType.userType==1){
        console.log('patient');
        const results = await Appointment.find({Patient:userId,canceled:true},{Patient:0,__v:0}).populate({
            path:'Doctor',
            model:AgoraUser,
            select:{__v:0,access_token:0,created_at:0,expire_date:0,token:0,type:0,password:0,userType:0,email:0},
            }).exec();
        res.send(results)
    }else if(UserType.userType){
        console.log('Doctor');
        const results = await Appointment.find({Doctor:userId,canceled:true},{Doctor:0,__v:0}).populate({
            path:'Patient',
            model:AgoraUser,
            select:{__v:0,access_token:0,created_at:0,expire_date:0,token:0,type:0,password:0,userType:0,email:0},
            }).exec();
        res.send(results)
    }else{throw createError(404,"invalid UserType ")}

    
    } catch (error) {
        console.log(error.message);
    }


},
doctorCancelAppointment:async(req,res,next)=>{
    const userId=req.payload.aud.replace(/['"]+/g, '');
    const AppointmentId=req.params.appointmentId;
    console.log(AppointmentId);
        
          try 
          {
           console.log('.... hello from accept appointment...')
            const appointment =await Appointment.findById(AppointmentId);
            console.log(appointment);
            console.log(appointment.Doctor);
            console.log(userId);

           if(appointment.Doctor==userId){
                const result=await Appointment.findByIdAndUpdate({_id:AppointmentId},{canceled:true,accepted:false},{new:true})
                res.send(result)

            }
            else{throw createError(404,"invalid Doctor ")}
              
        
            if(!appointment){throw createError(404,"Appointment does not exist ")}
           
          } 
             
          catch (error) 
          {
            console.log(error.message)
            if (error instanceof mongoose.CastError)
            {return next(createError(400,"Invalid Appointment Id"))}
            next(error)
          }  
        }
,
DoctorAcceptAppointment:async(req,res,next)=>{
    const userId=req.payload.aud.replace(/['"]+/g, '');
    console.log("... sender id ...",userId);
    const caller=await AgoraUser.findById({_id:userId});
    const user_avatar = caller.avatar;
    const user_name = caller.name;
  
    const AppointmentId=req.params.appointmentId;
    console.log(AppointmentId);
        
          try 
          {

           console.log('.... hello from accept appointment...')
           
            const appointment =await Appointment.findById(AppointmentId);
            const patient=await AgoraUser.findById(appointment.Patient);
            const patientFCMToken=patient.fcmtoken;
            console.log(appointment);
            console.log(appointment.Doctor);
            console.log(userId);
            if(appointment.Doctor==userId){
                const result=await Appointment.findByIdAndUpdate({_id:AppointmentId},{accepted:true,canceled:false},{new:true})
                if(result){
                    const message = {
                        token: patientFCMToken,
                        data: {
                          token: userId,
                          avatar: user_avatar,
                          name: user_name,
                          call_type: appointmentAccepted,
                        },
                        android: {
                          priority: 'high',
                          notification: {
                            channel_id: 'xxx',
                            title: 'Appointment Accepted by ' + user_name,
                            body: 'Please click to view',
                          },
                        },
                      };
                     
                      const r=await admin.messaging().send(message);
                      console.log(r);
                      
                }
                res.send(result)

            }
            else{throw createError(404,"invalid Doctor ")}
              
        
            if(!appointment){throw createError(404,"Appointment does not exist ")}
           
          } 
             
          catch (error) 
          {
            console.log(error.message)
            if (error instanceof mongoose.CastError)
            {return next(createError(400,"Invalid Appointment Id"))}
            next(error)
          }  
},
findAppointmentById:async(req,res,next)=>{
    const id =req.params.id;
    console.log(id)

    try {
        console.log('...hello from find appointment by id ...')
    const appointment =await Appointment.findById(id)
    .exec();
    console.log(appointment)
    //const doctor =await Appointment.find({_id:id})
   if(!appointment){
throw createError(404,"Appointment does not exist")

   }
  
    res.send(appointment)
} catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid Appointment id"))
        return;
    }
    next(error);
}


} ,
PostAppointment:async (req,res,next)=>{
    const patientId=req.payload.aud.replace(/['"]+/g, '');
    const patientPaymentId=req.paymentPayload.aud.replace(/['"]+/g, '');
    console.log(patientId);
    const doctorId=req.body.Doctor;
    console.log(doctorId);
    const options={new :true}
    try { 
        if(patientId==patientPaymentId){

            console.log('.....done appointment')
        //Patient Create appointment
        req.body['Patient']=patientId;
        console.log("......req body .....",req.body);
        const appointment= await Appointment.create(req.body);
    
        const appointmentWithPrescribtion=await Appointment.find(
            {_id:appointment.id}
        )
        res.send(appointmentWithPrescribtion)}
        else{res.json({code:-1,data:{},msg:"invalid user"})}
        
        
    } catch (error) {
        console.log(error.message)
        if(error.name === 'ValidationError'){
            next(createError(422,error.message));
            return;
        }
        next(error);
    }

},addPrescribtionAppointment:async (req,res,next)=>{
    const doctorId=req.payload.aud.replace(/['"]+/g, '');
    const appointmentId=mongoose.Types.ObjectId(req.body.appointmentId);
    const prescribtionData=req.body;
    console.log(prescribtionData)
    const options={new :true}
    try {    
        await Appointment.findById(appointmentId).then(
            async data=>{
               const appointmentDoctor= JSON.stringify(data.Doctor).replace(/['"]+/g, '');
                if(doctorId==appointmentDoctor){
                const prescribtionId=data.Prescribtion;
                console.log(prescribtionId)
                const addPrescribtion =await prescribtion.findOneAndUpdate(
                    {_id:prescribtionId}, 
                    {$addToSet:{ Pills:prescribtionData.Pills,Activities:prescribtionData.Activities} },
                    options
                    );
                res.json({code:0,data:addPrescribtion,msg:"success adding prescribtion"})
                }
                else{res.json({code:-1,data:{},msg:("wrong doctor")})}
                
                    
                   
                
            }
        );
        
        
    } catch (error) {
        console.log(error.message)
        if(error.name === 'ValidationError'){
            next(createError(422,error.message));
            return;
        }
        next(error);
    }},
DeleteAppointment:async(req,res,next)=>{
    const id =req.params.id
    
    try {
        const result =await Appintment.findByIdAndDelete(id)
        if(!result){
            throw createError(404,"Appointment does not exist")
            
               }
        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error.message)
        if(error instanceof mongoose.CastError){
    
            next(createError(400,"Invalid Appointment id"))
            return;
        }
        next(error);
    }
    
} ,
UpdateAppointmentById:async(req,res,next)=>{


    const id = req.params.id;
    const updates=req.body;
    const options={new :true}
        // res.send("updating a single Appointment")
          try 
          {
           
            const result =await Appointment.findByIdAndUpdate(id,updates, options);
        
            if(!result){throw createError(404,"Appointment does not exist ")}
            res.send(result)
          } 
             
          catch (error) 
          {
            console.log(error.message)
            if (error instanceof mongoose.CastError)
            {return next(createError(400,"Invalid Appointment Id"))}
            next(error)
          }  
},
}