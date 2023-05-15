const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Appintment =require('../Models/Appointment.Model');
const DoctorModel=require('../Models/Doctor.Model')
const PatientModel=require('../Models/Patient.Model')
const PatientSchaduleModel =require('../Models/SchadulePage/Schadule.Model');

module.exports=
{
getAllAppointments:async (req,res,next)=>{
    //next(new Error("cannont geta list of all products"))
    //res.send("getting a list of all products");

    try {
        //const results = await Product.find({},{__v:0})
        const results = await Appintment.find({},{})
        .populate(
            {path:'Doctor',
            model:DoctorModel,
            select:{__v:0}
        }
        )
        .exec();
        res.send(results)
    } catch (error) {
        console.log(error.message);
    }


},
findAppointmentById:async(req,res,next)=>{
    const id =req.params.id;
    console.log(id)

    try {
    const appointment =await Appintment.find({_id:id})
    .exec();
    console.log(appointment)
    //const doctor =await Product.find({_id:id})
   if(!appointment){
throw createError(404,"Product does not exist")

   }
  
    res.send(appointment)
} catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid product id"))
        return;
    }
    next(error);
}


} ,
PostAppointment:async (req,res,next)=>{

    try { 
        //const product=new Doctor(req.body);

        // const result=await product.save()
        // res.send(result);
        // console.log(result);
        // console.log(req.body);
        const appointment= await Appintment.create(req.body);
        console.log(appointment)
        res.send(appointment)
        
    } catch (error) {
        console.log(error.message)
        if(error.name === 'ValidationError'){
            next(createError(422,error.message));
            return;
        }
        next(error);
    }

},PostPatientAppointment:async (req,res,next)=>{
    const schaduleId=req.params.SchaduleId
    const updates=req.body;
    const options={new :true}
    try { 
        const appointment= await Appintment.create(updates);
        console.log(appointment.id)
        const addAppointment =await PatientSchaduleModel.findOneAndUpdate(
            {_id:schaduleId}, 
            { $addToSet:
                {
                    Appointment:appointment.id
                }
            },)
            console.log(appointment)
            const result=await PatientSchaduleModel.findById({_id:schaduleId});
        res.send(result)
        
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
           
            const result =await Appintment.findByIdAndUpdate(id,updates, options);
        
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