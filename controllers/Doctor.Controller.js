const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Doctor =require('../Models/Doctor.Model');

module.exports=
{
getAllDoctors:async (req,res,next)=>{
    //next(new Error("cannont geta list of all products"))
    //res.send("getting a list of all products");

    try {
        //const results = await Product.find({},{__v:0})
        const results = await Doctor.find({},{})
        
        res.send(results)
    } catch (error) {
        console.log(error.message);
    }


},
findDoctorById:async(req,res,next)=>{
    const id =req.params.id;
    console.log(id)

    try {
    const doctor =await Doctor.findById(id).exec();
    //const doctor =await Product.find({_id:id})
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
PostDoctor:async (req,res,next)=>{

    try { 
        //const product=new Doctor(req.body);

        // const result=await product.save()
        // res.send(result);
        // console.log(result);
        // console.log(req.body);
        const product= await Doctor.create(req.body);
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
DeleteDoctor:async(req,res,next)=>{
    const id =req.params.id
    
    try {
        const result =await Doctor.findByIdAndDelete(id)
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
UpdateDoctorById:async(req,res,next)=>{


    const id = req.params.id;
    const updates=req.body;
    const options={new :true}
        // res.send("updating a single product")
          try 
          {
           
            const result =await Doctor.findByIdAndUpdate(id,updates, options);
        
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