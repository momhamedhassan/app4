const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const DoctorModel=require('../../Models/Doctor.Model')
const Article = require('../../Models/Article/Article');
const ArticleCommunication=require('../../Models/Article/ArticleCommunocation')
module.exports=
{
    getAllArticles:async(req,res,next)=>{
        try{
            const results=await Article.find({},{})
            .populate(
            {path:'Doctor',
            model:DoctorModel,
            select:{__v:0}
            })
            .populate({
                path:'ArticleCommunication',
                model:ArticleCommunication,
                select:{__v:0}
            })
            .exec();
            res.send(results)
        }catch(error){
            console.log(error.message);
        }
    },
    postArticle:async(req,res,next)=>{
    
        try{
            const article= await Article.create(req.body);
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
    getArticleByID:async(req,res,next)=>{
        const id =req.params.id;
        console.log(id)
        try {
            const results=await Article.find({Doctor:id})
            .populate({
                path:'ArticleCommunication',
                model:ArticleCommunication,
                select:{__v:0}
            })
            .exec();
            if(!results){
                throw createError(404,"Product does not exist")
                   }
                    res.send(results)
            
        } catch (error) {
            console.log(error.message);
    if(error instanceof mongoose.CastError){

        next(createError(400,"Invalid product id"))
        return;
    }
    next(error);
        }
    },
    deleteArticleById:async(req,res,next)=>{
        const id =req.params.id
        
        try {
            const result =await Article.findByIdAndDelete(id)
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
    UpdateArticleById:async(req,res,next)=>{


        const id = req.params.id;
        const updates=req.body;
        const options={new :true}
            // res.send("updating a single product")
              try 
              {
               
                const result =await Article.findByIdAndUpdate(id,updates, options);
            
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
