const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Activity = require('../../Models/Prescribtion/Activity.Model')

module.exports=
{DeleteActivity:async(req,res,next)=>{
    const id =req.params.id;
    try {
   const activity=await Activity.findByIdAndDelete(id);
   
   res.json({code:0,data:{activity},msg:"Activity Removed successfuly"});
  
} catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid pill id"))
        return;
    }
    next(error);
}},
getAllActivities:async (req,res,next)=>{
    try{
        const activity =await Activity.find({});
        res.json({code:0,data:{activity},msg:"get all activities successfuly"})


    } catch (error) {
        console.log(error.message);
    }


},
findActivityById:async(req,res,next)=>{
    const PillId=req.params.id
    try {
   const activity=await Activity.findById(PillId);
   res.json({code:0,data:{activity},msg:"get activity successfuly"})
} catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid pill id"))
        return;
    }
    next(error);
}


} ,
AddActivity:async (req,res,next)=>{
    const activityData=req.body;
    try { 
      const activity=await Activity.create(pillData);
      res.json({code:0,data:{activity},msg:"add activity successfuly"})
        
    } catch (error) {
        console.log(error.message)
        if(error.name === 'ValidationError'){
            next(createError(422,error.message));
            return;
        }
        next(error);
    }

},
UpdateActivityById:async(req,res,next)=>{
    const activityId=req.params.id;
    const updates=req.body;
          try 
          {
           const activity =await Activity.findByIdAndUpdate({activityId},{updates},{new:true})
           res.json({code:0,data:{activity},msg:"update activity successfuly"})
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