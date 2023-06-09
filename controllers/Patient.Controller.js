const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Patient =require('../Models/Patient.Model');

module.exports=
{
    PostPatient:async (req,res,next)=>{

        try { 
           
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
      
    
    },
    getAllPatients:async (req,res,next)=>{
     
    
        try {
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
                    throw createError(404,"Patient does not exist")
                    
                       }
                console.log(result)
                res.send(result)
            } catch (error) {
                console.log(error.message)
                if(error instanceof mongoose.CastError){
            
                    next(createError(400,"Invalid Patient id"))
                    return;
                }
                next(error);
            }
            
        

    },
    UpdatePatientById:async (req,res,next)=>{
        const id = req.params.id;
        const updates=req.body;
        const options={new :true}
        
              try 
              {
               
                const result =await Patient.findByIdAndUpdate(id,updates, options);
            
                if(!result){throw createError(404,"Patient does not exist ")}
                res.send(result)
              } 
                 
              catch (error) 
              {
                console.log(error.message)
                if (error instanceof mongoose.CastError)
                {return next(createError(400,"Invalid patient Id"))}
                next(error)
              }  

    },
    getAPatientById:async(req,res,next)=>{
        const id =req.params.id;
        console.log(id)
        try {
        const patient =await Patient.findById(id)
        .exec();
       if(!patient){
    throw createError(404,"Patient does not exist")
       }
        res.send(patient)
    } catch (error) {
        console.log(error.message);
        if(error instanceof mongoose.CastError){
    
            next(createError(400,"Invalid patient id"))
            return;
        }
        next(error);
    }
    
    }

}