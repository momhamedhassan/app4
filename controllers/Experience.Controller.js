const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const DoctorEperience =require('../Models/Experience.Model');

module.exports=
{  
getAllDoctorExperience:async (req,res,next)=>{
    //next(new Error("cannont geta list of all products"))
    //res.send("getting a list of all products");

    try {
        //const results = await Product.find({},{__v:0})
        const results = await DoctorEperience.find({},{})
        
        res.send(results)
    } catch (error) {
        console.log(error.message);
    }


},
findDoctorExperienceById:async(req,res,next)=>{
    const id =req.params.id;

    try {
   // const doctor =await DoctorEperience.findById(id)
    //const product =await DoctorEperience.findOne({_id:id})
   const doctor =await DoctorEperience.find({DoctorId:id})
   if(!doctor){
throw createError(404,"Product does not exist")

   }
  
    res.send(doctor)
} catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid product id"))
        return;
    }
    next(error);
}


} ,
PostDoctorExperience:async (req,res,next)=>{

    try { 
        //const product=new Doctor(req.body);

        // const result=await product.save()
        // res.send(result);
        // console.log(result);
        // console.log(req.body);
        const product= await DoctorEperience.create(req.body);
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
DeleteDoctorExperience:async(req,res,next)=>{
    const id =req.params.id
    
    try {
        const result =await DoctorEperience.findByIdAndDelete(id)
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
UpdateDoctorExperienceById:async(req,res,next)=>{

        // res.send("updating a single product")
          try 
          {
            const id = req.params.id;
            const updates=req.body;
            const options={new :true}
            const result =await DoctorEperience.findByIdAndUpdate(id,updates, options);
        
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
},}