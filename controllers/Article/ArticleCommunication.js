const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const DoctorModel=require('../../Models/Doctor.Model')
const Article = require('../../Models/Article/Article');
const ArticleCommunocation=require('../../Models/Article/ArticleCommunocation')
module.exports=
{
    getAllArticleCommunication:async(req,res,next)=>{
        const id =req.params.id
        try{
            const results=await ArticleCommunocation.find({_id:id},{})
            .populate(
            {path:'Comments.Doctor',
            model:DoctorModel,
            select:{__v:0}
            }).exec();
            res.send(results)
        }catch(error){
            console.log(error.message);
        }
    },
    postArticleCommunication:async(req,res,next)=>{
    
        try{
            const article= await ArticleCommunocation.create(req.body);
            console.log(article)
            res.send(article)

        }catch(error){
            console.log(error.message)
            if(error.name === 'ValidationError'){
                next(createError(422,error.message));
                return;
            }
            next(error);
        }
    },
    getArticleLikes:async(req,res,next)=>{
        const id =req.params.id
        
        try {
            const result =await ArticleCommunocation.find({_id:id},{Comments:0,__v:0})
            .populate({
                path:"Likes",
                model:DoctorModel,
                select:{__v:0}
            })
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
        
    }

}
