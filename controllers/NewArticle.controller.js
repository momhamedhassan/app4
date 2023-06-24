const createError =require('http-errors');

const Article=require('./../Models/Article/Article');
const Agorauser=require('./../Models/AgoraUser');
const Doctor = require('../Models/Doctor.Model');

module.exports=
{getAllArticles:async (req,res,next)=>{
    
 
 
    try 
    {
        console.log('.... hello from get articles...');
       
        const articles=await Article.find({},{__v:0}).populate(
            {path:'Doctor',
            model:Agorauser,
            select:{__v:0,password:0,access_token:0,created_at:0,expire_date:0,token:0,userType:0,type:0},
            populate:{
            path:'doctorId',
            model:Doctor,
            select:{__v:0},
            }
        });

        res.json(articles)
    } catch (error) {
        console.log(error.message);
    }
},
PostArticle:async (req,res,next)=>{
    const userId=req.payload.aud.replace(/['"]+/g, '');
    const updates=req.body;
    updates["Doctor"]=userId;
 
    try 
    {
        console.log('.... hello from post articles...');      
        const article=await Article.create(updates);
        const articleWithPrescribtion=await Article.findById(article._id)
        res.json(articleWithPrescribtion)
    } catch (error) {
        console.log(error.message);
    }

},
getArticleById:async (req,res,next)=>{
    
    const ArticleId=req.params.articleId;

    try 
    {
        console.log('.... hello from get article by id ...');
        const articles=await Article.findById({_id:ArticleId},{__v:0}).populate(
            {path:'Doctor',
            model:Agorauser,
            select:{__v:0,password:0,access_token:0,created_at:0,expire_date:0,token:0,userType:0,type:0},
            populate:{
            path:'doctorId',
            model:Doctor,
            select:{__v:0},
            }
        });
        res.json(articles)
    } catch (error) {
        console.log(error.message);
    }



}}