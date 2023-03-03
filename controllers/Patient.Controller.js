const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Patient =require('../Models/Patient.Model');

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
       
        
    
    }

}