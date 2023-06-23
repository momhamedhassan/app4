const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Doctor =require('../Models/Doctor.Model');
const Appointment=require('../Models/Appointment.Model');
const Report=require('../Models/Report.Model');
const Prescribtion=require('../Models/Prescribtion.Model');

module.exports=
{
getAllReports:async (req,res,next)=>{
    //next(new Error("cannont geta list of all products"))
    //res.send("getting a list of all products");

    try {
        //const results = await Product.find({},{__v:0})
        const results = await Report.find({},{})
        
        res.send(results)
    } catch (error) {
        console.log(error.message);
    }


},
findReportById:async(req,res,next)=>{
    const id =req.params.id;
    console.log(id)

    try {
    const report =await Report.findById(id)
    .populate({
        path:'Prescribtion',
        model:Prescribtion,
        select:{__v:0}
    })
    .exec();
    //const doctor =await Product.find({_id:id})
   if(!report){
throw createError(404,"Product does not exist")    

   }
  
    res.send(report)
} catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid product id"))
        return;
    }
    next(error);
}


} ,
PostReport:async (req,res,next)=>{

    try { 
        
        const report= await Report.create(req.body);
        console.log(report)
        res.send(report._id)
        
    } catch (error) {
        console.log(error.message)
        if(error.name === 'ValidationError'){
            next(createError(422,error.message));
            return;
        }
        next(error);
    }
    // const product = new Product({

    //     name :req.body.name,
    //     price:req.body.price
    // })

    // product
    // .save()
    // .then(result=>{console.log(result);res.send(result);})
    // .catch(err=>{console.log(err.message)})
   
    

},
DeleteReport:async(req,res,next)=>{
    const id =req.params.id
    
    try {
        const result =await Report.findByIdAndDelete(id)
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
UpdateReportById:async(req,res,next)=>{


    const id = req.params.id;
    const updates=req.body;
    const options={new :true}
        // res.send("updating a single product")
          try 
          {
            const result =await Report.findByIdAndUpdate(id,updates, options);
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