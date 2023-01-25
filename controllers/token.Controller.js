const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Token =require('../Models/token.model');
module.exports=
{
    getAllToken:async (req,res,next)=>{
        //next(new Error("cannont geta list of all products"))
        //res.send("getting a list of all products");
    
        try {
            //const results = await Product.find({},{__v:0})
            const results = await Token.find({},{})
            
            res.send(results)
        } catch (error) {
            console.log(error.message);
        }
    
    
    },
    PostToken:async (req,res,next)=>{

        try { const token=new Token(req.body);
            const result=await token.save()
            res.send(result);
            
        } catch (error) {
            console.log(error.message)
            if(error.name === 'ValidationError'){
                next(createError(422,error.message));
                return;
            }
            next(error);
        }}
}