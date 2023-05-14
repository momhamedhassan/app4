const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const DoctorModel=require('../Models/Doctor.Model')
const PatientSchaduleModel =require('../Models/SchadulePage/Schadule.Model');
const Schadule = require('../Models/SchadulePage/Schadule.Model');

module.exports=
{
  //Schadule 
getSchaduleById:async (req,res,next)=>{
    const id =req.params.id;

    try {
    const result =await PatientSchaduleModel.find({PatientId:id})
    .populate(
      {
          path:"Appointment",
          model:Appointment,
          populate:{
              path:"Doctor",
              model:DoctorModel,
              select:{__v:0,patientsOfThisMonth:0,savedArticles:0}
          },
          select:{__v:0}
      })
    .exec();
    if(!result){
    throw createError(404,"Product does not exist")
    }
    res.send(result)
    } catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){
    next(createError(400,"Invalid product id"))
    return;
    }
    next(error);

}
}, 
PostSchadule:async (req,res,next)=>{

    try { 
        const product= await PatientSchaduleModel.create(req.body);
        console.log(product)
        res.send(product) 
    } catch (error) {
        console.log(error.message)
        if(error.name === 'ValidationError'){
            next(createError(422,error.message));
            return;
        }
        next(error);
    }
},
getAllPatientScadule:async (req,res,next)=>{
    try {
        const results = await PatientSchaduleModel.find({},{})
        .exec();
        
        res.send(results)
    } catch (error) {
        console.log(error.message);
    }


},
deleteSchadule:async(req,res,next)=>{
  const id =req.params.id
            
  try {
      const result =await Schadule.findByIdAndDelete(id)
      if(!result){
          throw createError(404,"Schadule does not exist")
          
             }
      console.log(result)
      res.send(result)
  } catch (error) {
      console.log(error.message)
      if(error instanceof mongoose.CastError){
  
          next(createError(400,"Invalid Scadule id"))
          return;
      }
      next(error);
  }
},

//Pills
PatchSchadulePills:async(req,res,next)=>{
  const id = req.params.id;
  const updates=req.body;
  const options={new :true}
        try 
        {
          const addPill =await PatientSchaduleModel.findOneAndUpdate(
          {_id:id}, 
          { $addToSet:
              {
                  Pills:updates.Pills
              },
          },
          )
          const result=await PatientSchaduleModel.findById({_id:id});
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
deletePill:async(req,res,next)=>{
    const SchaduleId = req.params.SchaduleId;
    const pillId=req.params.PillId;
    const options={new :true}
        
          try
          {
            const deletePill =await PatientSchaduleModel.findOneAndUpdate(
            {_id:SchaduleId}, 
            { $pull: {Pills:{_id:pillId}},},
            );
            const result=await PatientSchaduleModel.findById({_id:SchaduleId});
            if(!result){throw createError(404,"pill does not exist ")}
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

//Activity
PatchSchaduleActivities:async(req,res,next)=>{
    const id = req.params.id;
    const updates=req.body;
    const options={new :true}
          try 
          {
            const addActivities =await PatientSchaduleModel.findOneAndUpdate(
            {_id:id}, 
            { $addToSet:
                {
                    Activities:updates.Activities
                },
            },
            )
            const result=await PatientSchaduleModel.findById({_id:id});
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
deleteActivity:async(req,res,next)=>{
    const SchaduleId = req.params.SchaduleId;
    const ActivityId=req.params.ActivityId;
    const options={new :true}
        
          try
          {
            const deleteActivity =await PatientSchaduleModel.findOneAndUpdate(
            {_id:SchaduleId}, 
            { $pull: {Activities:{_id:ActivityId}},},
            );
            const result=await PatientSchaduleModel.findById({_id:SchaduleId});
            if(!result){throw createError(404,"Activity does not exist ")}
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
//Appointment
addAppointment:async(req,res,next)=>{
  const SchaduleId = req.params.SchaduleId;
  const updates=req.body;
  const options={new :true}
        try 
        {
          const addAAppointment =await PatientSchaduleModel.findOneAndUpdate(
          {_id:SchaduleId}, 
          { $addToSet:
              {
                  Appointment:updates.Appointment
              }
          },
          )
          const result=await PatientSchaduleModel.findById({_id:SchaduleId});
          if(!result){throw createError(404,"ِAppointment does not exist ")}
          res.send(result)
        }    
        catch (error) 
        {
          console.log(error.message)
          if (error instanceof mongoose.CastError)
          {return next(createError(400,"Invalid ِAppointment Id"))}
          next(error)
        }  

  },
  deleteAppointment:async(req,res,next)=>{
    const SchaduleId = req.params.SchaduleId;
    const AppointmentId=req.params.appointmentId;
    const options={new :true}
        
          try
          {
            const deleteActivity =await PatientSchaduleModel.findOneAndUpdate(
            {_id:SchaduleId}, 
            { $pull: {Appointment:{_id:AppointmentId}},},
            );
            const result=await PatientSchaduleModel.findById({_id:SchaduleId});
            if(!result){throw createError(404,"Appointment does not exist ")}
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