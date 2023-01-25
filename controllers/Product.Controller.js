
const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Product =require('../Models/Product.model');

module.exports=
{
  
getAllProducts:async (req,res,next)=>{
    //next(new Error("cannont geta list of all products"))
    //res.send("getting a list of all products");

    try {
        //const results = await Product.find({},{__v:0})
        const results = await Product.find({},{name:1 , _id:1,price:1})
        
        res.send(results)
    } catch (error) {
        console.log(error.message);
    }


},


findProductById:async(req,res,next)=>{
    const id =req.params.id;

    try {
    const product =await Product.findById(id)
   // const product =await Product.findOne({_id:id})
   if(!product){
throw createError(404,"Product does not exist")

   }
  
    res.send(product)
} catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid product id"))
        return;
    }
    next(error);
}


} ,


PostProduct:async (req,res,next)=>{

    try { const product=new Product(req.body);
        const result=await product.save()
        res.send(result);
        
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


DeleteProduct:async(req,res,next)=>{
    const id =req.params.id
    
    try {
        const result =await Product.findByIdAndDelete(id)
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


UpdateProductById:async(req,res,next)=>{

        // res.send("updating a single product")
          try 
          {
            const id = req.params.id;
            const updates=req.body;
            const options={new :true}
            const result =await Product.findByIdAndUpdate(id,updates, options);
        
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
} 
}