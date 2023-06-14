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

module.exports=
{findAppointmentByPateintId:async(req,res,next)=>{
    const id =req.params.patientId;
    try {
    const appointment =await Appointment.find({Pateint:id})
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
            const results = await Appointment.find({Patient:userId,accepted:true},{Patient:0,__v:0}).populate({
                path:'Doctor',
                model:AgoraUser,
                select:{__v:0,access_token:0,created_at:0,expire_date:0,token:0,type:0,password:0,userType:0,email:0},
                }).exec();
            res.send(results)
        }else if(UserType.userType){
            console.log('Doctor');
            const results = await Appointment.find({Doctor:userId,accepted:true},{Doctor:0}).populate({
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
              
        
            if(!appointment){throw createError(404,"Product does not exist ")}
           
          } 
             
          catch (error) 
          {
            console.log(error.message)
            if (error instanceof mongoose.CastError)
            {return next(createError(400,"Invalid Product Id"))}
            next(error)
          }  
        }
,
DoctorAcceptAppointment:async(req,res,next)=>{
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
                const result=await Appointment.findByIdAndUpdate({_id:AppointmentId},{accepted:true,canceled:false},{new:true})
                res.send(result)

            }
            else{throw createError(404,"invalid Doctor ")}
              
        
            if(!appointment){throw createError(404,"Product does not exist ")}
           
          } 
             
          catch (error) 
          {
            console.log(error.message)
            if (error instanceof mongoose.CastError)
            {return next(createError(400,"Invalid Product Id"))}
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
    //const doctor =await Product.find({_id:id})
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
            throw createError(404,"Product does not exist")
            
               }
        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error.message)
        if(error instanceof mongoose.CastError){
    
            next(createError(400,"Invalid product id"))
            return;
        }
        next(error);
    }
    
} ,
UpdateAppointmentById:async(req,res,next)=>{


    const id = req.params.id;
    const updates=req.body;
    const options={new :true}
        // res.send("updating a single product")
          try 
          {
           
            const result =await Appointment.findByIdAndUpdate(id,updates, options);
        
            if(!result){throw createError(404,"Product does not exist ")}
            res.send(result)
          } 
             
          catch (error) 
          {
            console.log(error.message)
            if (error instanceof mongoose.CastError)
            {return next(createError(400,"Invalid Product Id"))}
            next(error)
          }  
},
}