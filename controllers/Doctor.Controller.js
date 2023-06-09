const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Doctor =require('../Models/Doctor.Model');
const ArticlesModel=require('../Models/Article/Article')
const Appointment=require('../Models/Appointment.Model');
const Patient = require('../Models/Patient.Model');
const agoraUser=require('../Models/AgoraUser');

module.exports=
{
getAllDoctors:async (req,res,next)=>{
    const doctorSpeciality=req.params.doctorSpeciality;
    console.log(doctorSpeciality);
    var ids=[];
    try 
    {
        //agoraUser((name)(doctorid (Speciality)))
        // const listOfDoctors = await agoraUser.find({}).populate('Doctor');
        const Doctors=await Doctor.find({doctorSpeciality:doctorSpeciality});

        Doctors.forEach(element => ids.push(JSON.stringify(element._id).replace(/['"]+/g, '')));
        console.log(ids)
        const records = await agoraUser.find({},{__v:0,access_token:0,created_at:0,expire_date:0,token:0,type:0,userType:0}).where('doctorId').in(ids).populate({
            path:'doctorId',
            model:Doctor,
            select:{__v:0},
            })
            
        .exec();
        
        //const listOfDocSpetiality=await agoraUser.find({'doctorSpeciality':doctorSpeciality})

        
        res.json(records)
    } catch (error) {
        console.log(error.message);
    }
},
findDoctorById:async(req,res,next)=>{
    
    const userId=req.payload.aud.replace(/['"]+/g, '');
    const AgoraId=req.params.AgoraId;
    console.log("....agora user...",AgoraId);
    try {
    const result=await agoraUser.findById(AgoraId)
    console.log("... doctor id ...",result.doctorId);
    const doctor=await Doctor.findById({_id:result.doctorId},{__v:0});
 
   if(!doctor){
throw createError(404,"Doctor does not exist")

   }
    res.send(doctor)
} catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid product id"))
        return;
    }
    next(error);
}


} ,
PostDoctorInformation:async (req,res,next)=>{
    const userId=req.payload.aud.replace(/['"]+/g, '');
    const doctorInformation=req.body;
    console.log(doctorInformation)
   
    try { 
        console.log('...hello from post doctor informaion...')
        const result=await agoraUser.find({_id:userId})
        const DoctorId=JSON.stringify(result[0].doctorId).replace(/['"]+/g, '');
        console.log(DoctorId);

        const doctor=await Doctor.findByIdAndUpdate({_id:DoctorId},doctorInformation,{new:true});
        console.log(doctor)
        res.send(doctor);
        
    } catch (error) {
        console.log(error.message)
        if(error.name === 'ValidationError'){
            next(createError(422,error.message));
            return;
        }
        next(error);
    }
  


   
    

},
DeleteDoctor:async(req,res,next)=>{
    const id =req.params.id
    
    try {
        const result =await Doctor.findByIdAndDelete(id)
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
UpdateDoctorById:async(req,res,next)=>{


    const id = req.params.id;
    const updates=req.body;
    const options={new :true}
        // res.send("updating a single product")
          try 
          {
           
            const result =await Doctor.findByIdAndUpdate(id,updates, options);
        
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