const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const AppintmentModel =require('../Models/Appointment.Model');
const DoctorModel=require('../Models/Doctor.Model')
const PatientModel=require('../Models/Patient.Model')
const Presctibtion=require('../Models/Prescribtion.Model')
module.exports=
{
        getAllPrescribtions:async(req,res,next)=>{
            try {
                const results=await Presctibtion.find({},{})
                .populate({
                    path:'Appointment',
                    model:AppintmentModel,
                    select:{__v:0}
                })
                .exec();
                res.send(results)
            } catch (error) {
                console.log(error.message);
            }
        },
        postPrescribtion:async(req,res,next)=>{

            try{
                const prescribtion= await Presctibtion.create(req.body);
                console.log(prescribtion)
                res.send(prescribtion)
    
            }catch(error){
                console.log(error.message)
                if(error.name === 'ValidationError'){
                    next(createError(422,error.message));
                    return;
                }
                next(error);
            }
        },
        findPrescribtionById:async(req,res,next)=>{
            const id =req.params.id;
            console.log(id)
        
            try {
            const prescribtion =await Presctibtion.findById(id)
            .exec();
            //const doctor =await Product.find({_id:id})
           if(!prescribtion){
        throw createError(404,"Product does not exist")
        
           }
          
            res.send(prescribtion)
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError){
        
                next(createError(400,"Invalid product id"))
                return;
            }
            next(error);
        }
        
        
        },
        DeletePrescribtion:async(req,res,next)=>{
            const id =req.params.id
            
            try {
                const result =await Presctibtion.findByIdAndDelete(id)
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
            
        },
        UpdatePrescribtionById:async(req,res,next)=>{


            const id = req.params.id;
            const updates=req.body;
            let flag=new Boolean(true);
            if(!updates.NextAppointment){
                flag=false;
                console.log(flag)
            }
            const options={new :true}
                  try 
                  {
                    if (flag==true) {
                        
                    
                    //create new appointment
                    const appointment=await AppintmentModel.create({Patient:updates.Patient,Doctor:updates.Doctor,AppointmentDate:updates.NextAppointment});
                    console.log(updates.NextAppointment)
                    console.log(updates.Doctor);
                    console.log(updates.Patient)
                    //create new prescribtion with Patient id, Doctor id,Appointment id
                    const prescribtion=await Presctibtion.create({PatientId:appointment.Patient,DoctorId:appointment.Doctor,Appointment:appointment.id});
                    console.log(prescribtion.id)

                    //add prescribtion to appointment
                    const addPrescrebtionToAppointment=await AppintmentModel.findByIdAndUpdate(
                        {_id:appointment.id}, 
                        {Prescribtion:prescribtion.id},
                        options
                    )
                    //add pills , activity ,nextAppointment to it
                    const result =await Presctibtion.findByIdAndUpdate(id,{Pills:updates.Pills,Activities:updates.Activities,NextAppointment:appointment.id}, options);
                
                    if(!result){throw createError(404,"Prescribtion does not exist ")}
                    res.send(result)
                    }else{
                        console.log("from else state")
                    const result =await Presctibtion.findByIdAndUpdate(id,{Pills:updates.Pills,Activities:updates.Activities}, options);
                    if(!result){throw createError(404,"Prescribtion does not exist ")}
                    res.send(result)
                    }
                  } 
                     
                  catch (error) 
                  {
                    console.log(error.message)
                    if (error instanceof mongoose.CastError)
                    {return next(createError(400,"Invalid Prescribtion Id"))}
                    next(error)
                  }  
        }
}