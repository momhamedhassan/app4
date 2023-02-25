
const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
var MongoClient=require('mongodb').MongoClient;
const DoctorReview =require('../Models/Review.Model.js');

module.exports=
{
  
getAllDoctorReviews:async (req,res,next)=>{
    //next(new Error("cannont geta list of all products"))
    //res.send("getting a list of all products");

    try {
        //const results = await Product.find({},{__v:0})
        const results = await DoctorReview.find({},{})
        
        res.send(results)
    } catch (error) {
        console.log(error.message);
    }


},
PostDoctorReview:async (req,res,next)=>{

    try { 
        //const product=new Doctor(req.body);

        // const result=await product.save()
        // res.send(result);
        // console.log(result);
        // console.log(req.body);
        const product= await DoctorReview.create(req.body);
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
   
    

}}
// try{const Review = await DoctorReview.create({
//     img:"mohamed",
//     patientName:"mohamed",
//     Rating:"mohamed",
//     feedBackContent:"mohamed",
//     date:"mohamed",
//     waitingTime:"mohamed",
//     bedSideManner:"mohamed",
//     consulting:"mohamed"
//     })}catch(err){
//         console.log(error)
//     }