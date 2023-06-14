const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const AppintmentModel =require('../Models/Appointment.Model');
const DoctorModel=require('../Models/Doctor.Model')
const PatientModel=require('../Models/Patient.Model')
const Presctibtion=require('../Models/Prescribtion.Model');
const Pill = require('../Models/Prescribtion/Pill.Model');
const Activity = require('../Models/Prescribtion/Activity.Model');
const appointment = require('../Models/Appointment.Model');
const prescribtion = require('../Models/Prescribtion.Model');
module.exports=
{
        getAllPrescribtions:async(req,res,next)=>{
            const userId=req.payload.aud.replace(/['"]+/g, '');
            try {
                const results=await Presctibtion.find({PatientId:userId})
                .populate({
                    path:'Pills.pillId',
                    model:Pill,
                    select:{__v:0}
                })
                .populate({
                    path:'Activities.ActivityId',
                    model:Activity,
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
          
           if(!prescribtion){
        throw createError(404,"Prescribtion does not exist")
        
           }
          
            res.send(prescribtion)
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError){
        
                next(createError(400,"Invalid Pills id"))
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
                    throw createError(404,"Pills does not exist")
                    
                       }
                console.log(result)
                res.send(result)
            } catch (error) {
                console.log(error.message)
                if(error instanceof mongoose.CastError){
            
                    next(createError(400,"Invalid Pills id"))
                    return;
                }
                next(error);
            }
            
        },
        UpdatePrescribtionById:async(req,res,next)=>{


            const appointmentId = req.params.appointmentId;
            console.log(appointmentId);
            const userId=req.payload.aud.replace(/['"]+/g, '');
            console.log("doctorId",userId);
            const updates=req.body;
            console.log(updates);
           

            const options={new :true}
                  try 
                  {
                    const currentAppointment=await AppintmentModel.findById({_id:appointmentId});
                    console.log("current appointment",currentAppointment);

                    if(userId && userId==currentAppointment.Doctor)
                   { 
                    if(updates.isNext){
                    //add next appointment 
                    const nextAppointment=await appointment.create({Patient:currentAppointment.Patient,Doctor:userId,AppointmentDate:updates.nextAppointment,accepted:true})
                    //add pills and activity
                    await Presctibtion.updateOne({_id:currentAppointment.Prescribtion},{ $addToSet:{Pills:updates.Pills,Activities:updates.Activities}}, options);
                    const result=await Presctibtion.findByIdAndUpdate({_id:currentAppointment.Prescribtion},{NextAppointment:nextAppointment._id},{new:true})
                
                    if(!result){throw createError(404,"Prescribtion does not exist ")}
                    res.send(result)
                    }
                    else{
                        const currentAppointment=await AppintmentModel.findById({_id:appointmentId});
                        console.log("current appointment",currentAppointment);
                         //add pills and activity
                        await Presctibtion.updateOne({_id:currentAppointment.Prescribtion},{ $addToSet:{Pills:updates.Pills,Activities:updates.Activities}}, options);
                        const result=await Presctibtion.findById({_id:currentAppointment.Prescribtion})
                    
                        if(!result){throw createError(404,"Prescribtion does not exist ")}
                        res.send(result)

                    }
                   }
                    else{
                        throw createError(404," invalid doctor ")
                    }
                  }        
                  catch (error) 
                  {
                    console.log(error.message)
                    if (error instanceof mongoose.CastError)
                    {return next(createError(400,"Invalid Prescribtion Id"))}
                    next(error)
                  }  
        },AddTurn:async(req,res,next)=>{
            const appointmentId = req.params.appointmentId;
            const pillId=req.params.pillId;
            const userId=req.payload.aud.replace(/['"]+/g, '');
            const updates=req.body.TurnTime;
            console.log(updates)
            const type=req.body.Type
            console.log(type)

            try{
                const currentAppointment=await AppintmentModel.findById({_id:appointmentId});
                console.log(currentAppointment);

                if(userId && userId==currentAppointment.Patient )
               { 
                console.log("correct User");
              
               if(currentAppointment.Prescribtion){
                console.log("there is prescribtion")



                 Presctibtion.findOne({ _id: currentAppointment.Prescribtion },async function(err, Pills) {
                    if (err) {
                      console.log(err);
                    } else if (!Pills) {
                      console.log('Pills not found.');
                    } else {
                       
                      const pilll = Pills.Pills.find(r => r._id.equals(pillId));
                      if (!pilll) {
                        console.log('Pill not found.');
                      } else {
                        
                        if (pilll.dose > 0) {
                          pilll.dose--;
                          Pills.save(async function(err) {
                            if (err) {
                              console.log(err);
                              
                            } else {
                             
                              if(type==1){
                                //decrease number of dose
                                //add Turn
                                await Presctibtion.updateOne({_id: currentAppointment.Prescribtion ,'Pills._id':pillId},{ $addToSet: { "Pills.$.turn": updates } })
                                //calculate next turn
                                
                                //1-get numberOfUse 
                                //2-calulate unit of add
                                //3-add unit of add to time of turn 
                                //4-post result in time of nextPill
                                
                                //call function by time 
                                //1-find pill
                                //2-check dose (get nextdose)
                                //if still


                                const r2=await Presctibtion.findById(currentAppointment.Prescribtion)
                                res.send(r2)
                              }
                              else if(type==2){
                                await Presctibtion.updateOne({_id: currentAppointment.Prescribtion ,'Pills._id':pillId},{ $addToSet: { "Pills.$.MissedTurn": updates }})
                                const r2=await Presctibtion.findById(currentAppointment.Prescribtion)
                                res.send(r2)
                              }else{
                                throw createError(404," invalid type ")
                              }
                             
                               
                            }
                          });
                        }else{
                            const r=await Presctibtion.updateOne({_id: currentAppointment.Prescribtion ,'Pills._id':pillId},{ "Pills.$.allTaken": true  })
                            const r2=await Presctibtion.findById({_id: currentAppointment.Prescribtion ,'Pills._id':pillId})
                            console.log(r2)
                            res.send("you reach dose limit")
                        }
                      }
                    }
                  });
                // Presctibtion.findOneAndUpdate(
                //     { _id: currentAppointment.Prescribtion, Pills: { $elemMatch: { _id: pillId } }, 'Pills.dose': { $gt: 0 } },
                //     { $inc: { 'Pills.$.dose': -1 },'Pills.$': 1 },
                //     { new: true }
                //   ).exec(function(err, Pills) {
                //     if (err) {
                //       console.log(err);
                //     } else if (!Pills) {
                //       console.log('Pills not found.');
                //     } else {
                //         console.log(Pills)
                //       const pilll = Pills.Pills.id(pillId);
                //       console.log(pilll);
                //     }
                //   });
                  
                // await Presctibtion.findOne(
                //     { _id: currentAppointment.Prescribtion , Pills: { $elemMatch: { _id: pillId } } },
                //     { 'Pills.$': 1 }
                //   ).exec(function(err, Pills) {
                //     if (err) {
                //       console.log(err);
                //     } else if (!Pills) {
                //       console.log('Pills not found.');
                //     } else {
                //       const pilll = Pills.Pills[0];
                //       console.log(pilll);
                //     }
                //   });



                // const afterDecreaseDose=await Presctibtion.findOneAndUpdate(
                //     {_id: currentAppointment.Prescribtion ,'Pills._id':pillId,'Pills.dose': { $gt: 0 } },
                //     { $inc: { 'Pills.$.dose': -1 } },
                //     { new: true }
                //   ).exec(async function(err, result) {
                //     if (err) {
                //       console.log(err);
                //       throw createError(404,"query error ")
                //     } else if (!result) {
                //       console.log('result not found.');
                //       res.status(200).send('you reached dose limit')
                //     } else {
                //       console.log(result);
                //       const r=await Presctibtion.updateOne({_id: currentAppointment.Prescribtion ,'Pills._id':pillId},{ $addToSet: { "Pills.$.turn": updates } })
                //       const r2=await Presctibtion.findById(currentAppointment.Prescribtion)
                //       res.send(r2)
                //     }
                //   });
                
                //console.log(afterDecreaseDose)
            
            
                
                
               } else{
                throw createError(404," there is no prescribtion ")
            }
               }
                else{
                    throw createError(404," invalid user ")
                }
    
            }catch(error){
                console.log(error.message)
                if(error.name === 'ValidationError'){
                    next(createError(422,error.message));
                    return;
                }
                next(error);
            }

        },
        deletePill:async(req,res,next)=>{
            const PillId = req.params.PillId;
            const PrescribtionId=req.params.prescribtionId;
            const options={new :true}
                
                  try 
                  {
               
                    const addComment =await prescribtion.findOneAndUpdate(
                    {_id:PrescribtionId}, 
                    { $pull: {Pills:{_id:PillId}},},options
                    );
                    const result=await prescribtion.findById({_id:PrescribtionId});
                    if(!result){throw createError(404,"prescribtion does not exist ")}
                    res.send(result)
                  } 
                     
                  catch (error) 
                  {
                    console.log(error.message)
                    if (error instanceof mongoose.CastError)
                    {return next(createError(400,"Invalid prescribtion Id"))}
                    next(error)
                  }  
        },
        deletActivity:async(req,res,next)=>{
            const ActivityId = req.params.ActivityId;
            const PrescribtionId=req.params.prescribtionId;
            const options={new :true}
                
                  try 
                  {
               
                    const addComment =await prescribtion.findOneAndUpdate(
                    {_id:PrescribtionId}, 
                    { $pull: {Activities:{_id:ActivityId}},},options
                    );
                    const result=await prescribtion.findById({_id:PrescribtionId});
                    if(!result){throw createError(404,"prescribtion does not exist ")}
                    res.send(result)
                  } 
                     
                  catch (error) 
                  {
                    console.log(error.message)
                    if (error instanceof mongoose.CastError)
                    {return next(createError(400,"Invalid prescribtion Id"))}
                    next(error)
                  }  
        },CompletedPill:async(req,res,next)=>{
            const appointmentId = req.params.appointmentId;
            const pillId=req.params.pillId;
            const userId=req.payload.aud.replace(/['"]+/g, '');
            

            try{
                const currentAppointment=await AppintmentModel.findById({_id:appointmentId});
                console.log(currentAppointment);

                if(userId && userId==currentAppointment.Patient)
               { 
              
                const r=await Presctibtion.updateOne({_id: currentAppointment.Prescribtion ,'Pills._id':pillId},{ "Pills.$.allTaken": true  })
                const r2=await Presctibtion.findById({_id: currentAppointment.Prescribtion ,'Pills._id':pillId})
                console.log(r2)
            
            
                if(!r){throw createError(404,"Prescribtion does not exist ")}
                res.send(r2)
               
               }
                else{
                    throw createError(404," invalid doctor ")
                }
    
            }catch(error){
                console.log(error.message)
                if(error.name === 'ValidationError'){
                    next(createError(422,error.message));
                    return;
                }
                next(error);
            }

        },
}