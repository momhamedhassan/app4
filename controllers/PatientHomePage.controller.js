const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Patient =require('../Models/Patient.Model');
const Appointment=require('../Models/Appointment.Model');
const DoctorModel=require('../Models/Doctor.Model')
const Article = require('../Models/Article/Article');
const SchadulePage=require('../Models/SchadulePage/Schadule.Model');

module.exports=
{getPatientHomePage:async(req,res,next)=>{
    const id =req.params.id;
    try{
        const schadulePage=await SchadulePage.find({PatientId:id})
        .populate(
            {
                path:"Appointment",
                model:Appointment,
                populate:{
                    path:"Doctor",
                    model:DoctorModel,
                    select:{__v:0,patientsOfThisMonth:0,savedArticles:0}
                },
                select:{__v:0}
            })
        .exec();
        const patient=await Patient.find({_id:id}).exec();
        const articles=await Article.find().exec();

        const result={schadulePage,articles,pateint: patient};
        if(!result){
            throw createError(404,"item does not exist")
               }
              
                res.send(result)

    }catch (error) {
        console.log(error.message);
        if(error instanceof mongoose.CastError){
    
            next(createError(400,"Invalid product id"))
            return;
        }
        next(error);
    }
},



}