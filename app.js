
const express =require ('express');
const ProductRoute =require('./route/Doctor.route');
const app =express();
const createError=require('http-errors');
app.use(express.json());
const dotenv =require('dotenv').config();


//Initialize DB
require('./initDB')();


app.all('/test',(req,res)=>{
console.log(req.body);
res.send(req.body);
})


app.use('/Doctors',ProductRoute);
//app.use('/Doctors/Reviews',DoctorReviewRoute);


app.use((req,res,next)=>{
    next(createError(404,"Not found"))
}
)
app.use((err,req,res,next)=>{

res.status(err.status || 500)
res.send({error:{status:err.status||500 ,message:err.message}})

})
const PORT =process.env.PORT ||3005

app.listen (PORT,()=>{console.log("server started on port "+PORT+'...')});