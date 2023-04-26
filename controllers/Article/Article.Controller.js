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
           
            .exec();
            res.send(results)
        }catch(error){
            console.log(error.message);
        }
    },
    postArticle:async(req,res,next)=>{
        const options={new :true}
        try{
            console.log(typeof(req.body));
            var item={}
            const article= await Article.create(req.body);
            const articleCommunication =await ArticleCommunication.create(item);
            
            console.log(articleCommunication);


            const myJSON = JSON.stringify(articleCommunication._id);
            var mySubString =myJSON .substring(
                myJSON.indexOf("\"")+1 , 
                myJSON.lastIndexOf("\"")
            );

            const myJSON1 = JSON.stringify(article._id);
            var mySubString1 =myJSON1 .substring(
                myJSON.indexOf("\"")+1 , 
                myJSON.lastIndexOf("\"")
            );
            console.log(myJSON1)
            console.log(mySubString)
            const updateArticle=await Article.findByIdAndUpdate(
                mySubString1,
               {ArticleCommunication:mySubString}
                , options);
                console.log(updateArticle)

            // console.log(mySubString)
            // console.log(article._id)
            
             
            //console.log(typeof(article._id))
            res.send(updateArticle)

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
            const results=await Article.findOne({Doctor:id})
            .populate({
                path:'Doctor',
                model:DoctorModel,
                select:{__v:0}
            }).exec();
            
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
                console.log(updates)
                console.log(typeof(updates))
                console.log(id)
                console.log(typeof(id))
                console.log(req.params)
            
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
