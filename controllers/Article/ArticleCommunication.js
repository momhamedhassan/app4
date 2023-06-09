const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const DoctorModel=require('../../Models/Doctor.Model')
const Article = require('../../Models/Article/Article');
const ArticleCommunocation=require('../../Models/Article/ArticleCommunocation')
const AgoraUser=require('./../../Models/AgoraUser')
module.exports=
{
    patchArticleLikes:async(req,res,next)=>{
        const id = req.params.id;
        const userId=req.payload.aud.replace(/['"]+/g, '');
        var data=[{"Doctor":userId}];
        const options={new :true}
              try 
              {
                const check=await ArticleCommunocation.findOne({'Likes.Doctor':userId})
                if(!check){
                    console.log('like')
                    const addLikes =await ArticleCommunocation.findOneAndUpdate(
                        {_id:id}, 
                        { $addToSet: {Likes:data},},
                        )
                        const result=await ArticleCommunocation.findById({_id:id});
                        if(!result){throw createError(404,"ArticleCommunication does not exist ")}
                        res.send(result)
                }else{
                    console.log('dislike')
                    const addComment =await ArticleCommunocation.findOneAndUpdate(
                        {_id:id}, 
                        { $pull: {Likes:{Doctor:userId}},},
                        );
                        const result=await ArticleCommunocation.findById({_id:id});
                        if(!result){throw createError(404,"ArticleCommunication does not exist ")}
                        res.send(result)
                }
               
        
              } 
                 
              catch (error) 
              {
                console.log(error.message)
                if (error instanceof mongoose.CastError)
                {return next(createError(400,"Invalid ArticleCommunication Id"))}
                next(error)
              }  

    },
    getArticleCommunicationById:async(req,res,next)=>{
        const id =req.params.id
        try{
            console.log('... hello from article commuinacation ...')
            const results=await ArticleCommunocation.findById({_id:id})
            .populate(
            {path:'Comments.Doctor',
            model:AgoraUser,
            select:{__v:0,access_token:0,created_at:0,expire_date:0,token:0,password:0,userType:0,type:0},
            populate:{
                path:'doctorId',
                model:DoctorModel,
                select:{__v:0}
            }
            }).populate(
            {path:'Likes.Doctor',model:AgoraUser,
            select:{__v:0,access_token:0,created_at:0,expire_date:0,token:0,password:0,userType:0,type:0},
            populate:{
                path:'doctorId',
                model:DoctorModel,
                select:{__v:0}
            }
            
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
                path:"Likes.Doctor",
                model:AgoraUser,
                select:{__v:0,access_token:0,created_at:0,expire_date:0,token:0,password:0,userType:0,type:0}
            })
            if(!result){
                throw createError(404,"ArticleCommunication does not exist")
                
                   }
            console.log(result)
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongoose.CastError){
        
                next(createError(400,"Invalid ArticleCommunication id"))
                return;
            }
            next(error);
        }
        
    },
    AddComment:async(req,res,next)=>{
        const id = req.params.id;
        const userId=req.payload.aud.replace(/['"]+/g, '');
        
        const updates=req.body;
       
        updates.Comments.forEach(element => {
        element.Doctor=userId;
        console.log(element)
        });
        
        console.log(updates)
        const options={new :true}
         
              try 
              {
                
                const addComment =await ArticleCommunocation.findOneAndUpdate(
                {_id:id}, 
                { $addToSet: {Comments:updates.Comments},},
                );
                const result=await ArticleCommunocation.findById({_id:id});
                if(!result){throw createError(404,"ArticleCommunication does not exist ")}
                res.send(result)
              } 
                 
              catch (error) 
              {
                console.log(error.message)
                if (error instanceof mongoose.CastError)
                {return next(createError(400,"Invalid ArticleCommunication Id"))}
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
                if(!result){throw createError(404,"ArticleCommunication does not exist ")}
                res.send(result)
              } 
                 
              catch (error) 
              {
                console.log(error.message)
                if (error instanceof mongoose.CastError)
                {return next(createError(400,"Invalid ArticleCommunication Id"))}
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
                if(!result){throw createError(404,"ArticleCommunication does not exist ")}
                res.send(result)
              } 
                 
              catch (error) 
              {
                console.log(error.message)
                if (error instanceof mongoose.CastError)
                {return next(createError(400,"Invalid ArticleCommunication Id"))}
                next(error)
              }  
    }

}
