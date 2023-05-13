const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const PatientSchaduleModel =require('../Models/SchadulePage/Schadule.Model');

module.exports=
{
    getSchaduleById:async (req,res,next)=>{
    const id =req.params.id;

    try {
    const result =await PatientSchaduleModel.find({PatientId:id})
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
}, PostSchadule:async (req,res,next)=>{

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
},PatchSchadulePills:async(req,res,next)=>{
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
getAllPatientScadule:async (req,res,next)=>{
    try {
        const results = await PatientSchaduleModel.find({},{})
        .exec();
        
        res.send(results)
    } catch (error) {
        console.log(error.message);
    }


},deletePill:async(req,res,next)=>{
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
},PatchSchaduleActivities:async(req,res,next)=>{
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

},deleteActivity:async(req,res,next)=>{
    const SchaduleId = req.params.SchaduleId;
    const ActivityId=req.params.ActivityId;
    const options={new :true}
        
          try
          {
            const deletePill =await PatientSchaduleModel.findOneAndUpdate(
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


  }