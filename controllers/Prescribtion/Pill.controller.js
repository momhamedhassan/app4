const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Pill = require('../../Models/Prescribtion/Pill.Model')

module.exports=
{DeletePill:async(req,res,next)=>{
    const id =req.params.id;
    try {
   const pill=await Pill.findByIdAndDelete(id);
   
   res.json({code:0,data:{pill},msg:"Pill Removed successfuly"});
  
} catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid pill id"))
        return;
    }
    next(error);
}},
getAllPills:async (req,res,next)=>{
    try{
        const Pills =await Pill.find({});
        res.json(Pills);


    } catch (error) {
        console.log(error.message);
    }


},
findPillById:async(req,res,next)=>{
    const PillId=req.params.id
    try {
   const pill=await Pill.findById(PillId);
   res.json({code:0,data:{pill},msg:"get Pill successfuly"})
} catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid pill id"))
        return;
    }
    next(error);
}


} ,
AddPill:async (req,res,next)=>{
    const pillData=req.body;
    try { 
      const pill=await Pill.create(pillData);
      res.json({code:0,data:{pill},msg:"add Pill successfuly"})
        
    } catch (error) {
        console.log(error.message)
        if(error.name === 'ValidationError'){
            next(createError(422,error.message));
            return;
        }
        next(error);
    }

},
UpdatePillById:async(req,res,next)=>{
    const pillId=req.params.id;
    const updates=req.body;
          try 
          {
           const pill =await Pill.findByIdAndUpdate({pillId},{updates},{new:true})
           res.json({code:0,data:{pill},msg:"update Pill successfuly"})
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