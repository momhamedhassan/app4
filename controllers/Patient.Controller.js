const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Patient =require('../Models/Patient.Model');
const Appointment=require('../Models/Appointment.Model');
const DoctorModel=require('../Models/Doctor.Model')

module.exports=
{
    PostPatient:async (req,res,next)=>{

        try { 
            //const product=new Doctor(req.body);
    
            // const result=await product.save()
            // res.send(result);
            // console.log(result);
            // console.log(req.body);
            const product= await Patient.create(req.body);
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
      
    
        // const product = new Product({
    
        //     name :req.body.name,
        //     price:req.body.price
        // })
    
        // product
        // .save()
        // .then(result=>{console.log(result);res.send(result);})
        // .catch(err=>{console.log(err.message)})
       
        
    
    },
    getAllPatients:async (req,res,next)=>{
        //next(new Error("cannont geta list of all products"))
        //res.send("getting a list of all products");
    
        try {
            //const results = await Product.find({},{__v:0})
            const results = await Patient.find({},{})
            
            res.send(results)
        } catch (error) {
            console.log(error.message);
        }
    
    
    },
    DeletePatientById:async(req,res,next)=>{
            const id =req.params.id
            
            try {
                const result =await Patient.findByIdAndDelete(id)
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
    UpdatePatientById:async (req,res,next)=>{
        const id = req.params.id;
        const updates=req.body;
        const options={new :true}
            // res.send("updating a single product")
              try 
              {
               
                const result =await Patient.findByIdAndUpdate(id,updates, options);
            
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
    getAPatientById:async(req,res,next)=>{
        const id =req.params.id;
        console.log(id)
    
        try {
        const patient =await Patient.findById(id)
        .exec();

        
        //const doctor =await Product.find({_id:id})
       if(!patient){
    throw createError(404,"Product does not exist")
    
       }
      
        res.send(patient)
    } catch (error) {
        console.log(error.message);
        if(error instanceof mongoose.CastError){
    
            next(createError(400,"Invalid product id"))
            return;
        }
        next(error);
    }
    
    }

}