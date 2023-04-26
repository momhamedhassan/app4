const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const DoctorModel=require('../../Models/Doctor.Model')
const Article = require('../../Models/Article/Article');
const ArticleCommunocation=require('../../Models/Article/ArticleCommunocation')
module.exports=
{
    patchArticleLikes:async(req,res,next)=>{
        const id = req.params.id;
        const updates=req.body;
        const options={new :true}
            // res.send("updating a single product")
              try 
              {
                // console.log(updates.Comments)
                const addComment =await ArticleCommunocation.findOneAndUpdate(
                {_id:id}, 
                { $addToSet: {Likes:updates.Likes},},
                )
                // const result=await ArticleCommunocation.findById()
                const result=await ArticleCommunocation.findById({_id:id});

             
               
                // const result =await ArticleCommunocation.findByIdAndUpdate(id,updates, options);
                // console.log(updates)
                // console.log(typeof(updates))
                // console.log(id)
                // console.log(typeof(id))
                // console.log(req.params)
                // console.log(req.body)
            
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
    getAllArticleCommunicationById:async(req,res,next)=>{
        const id =req.params.id
        try{
            const results=await ArticleCommunocation.findById({_id:id},{})
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
    getAllArticleCommunication:async(req,res,next)=>{
      
        try{
            const results=await ArticleCommunocation.find({},{})
            .exec();
            res.send(results)
        }catch(error){
            console.log(error.message);
        }}
    
    ,
    postArticleCommunication:async(req,res,next)=>{
        try{
            console.log(typeof(req.body))
            var item={}
            console.log(typeof(item))
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
        
    },
    AddComment:async(req,res,next)=>{
        const id = req.params.id;
        const updates=req.body;
        const options={new :true}
            // res.send("updating a single product")
              try 
              {
                // console.log(updates.Comments)
                const addComment =await ArticleCommunocation.findOneAndUpdate(
                {_id:id}, 
                { $addToSet: {Comments:updates.Comments},},
                );
                const result=await ArticleCommunocation.findById({_id:id});
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
    },deleteComment:async(req,res,next)=>{
        const articleCommunicationId = req.params.ArticleCommunicatioId;
        const commentId=req.params.CommentId;
        const options={new :true}
            // res.send("updating a single product")
              try 
              {
                // console.log(updates.Comments)
                const addComment =await ArticleCommunocation.findOneAndUpdate(
                {_id:articleCommunicationId}, 
                { $pull: {Comments:{_id:commentId}},},
                );
                const result=await ArticleCommunocation.findById({_id:articleCommunicationId});
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
    ,Dislike:async(req,res,next)=>{
        // not Done
        const articleCommunicationId = req.params.ArticleCommunicatioId;
        const commentId=req.params.CommentId;
        const options={new :true}
            // res.send("updating a single product")
              try 
              {
                // console.log(updates.Comments)
                const addComment =await ArticleCommunocation.findOneAndUpdate(
                {_id:articleCommunicationId}, 
                { $pull: {Likes:{_id:commentId}},},
                );
                const result=await ArticleCommunocation.findById({_id:articleCommunicationId});
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
