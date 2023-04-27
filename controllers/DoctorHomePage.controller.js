const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const Doctor=require('../Models/Doctor.Model');
const Appointment=require('../Models/Appointment.Model');
const Article = require('../Models/Article/Article');
const Patient=require('../Models/Patient.Model');

module.exports=
{
    getDoctorHomePage:async(req,res,next)=>{
        const id =req.params.id;
        try {
        const doctor =await Doctor.findById(id)
        .exec();
        const appointments=await Appointment.find({Doctor:id},{Doctor:0})
        .populate(
            {path:'Patient',
            model:Patient,
            select:{__v:0}
        })
        .exec();
        const articles=await Article.find({})
        .populate(
            {path:'Doctor',
            model:Doctor,
            select:{__v:0,Rank:0,location:0,experience_years:0,about_doctor:0,patientsOfThisMonth:0,savedArticles:0,rating:0}
        })
        .exec();

       appointments.forEach((element) => {
        var date =new Date();
        const appointmentDate=element.AppointmentDate
        const f=new Date(appointmentDate);
        function isEqual(x,y){
            if(x==y){
                return true;
            }
            else{
                return false;
            }
        }
    
        if(isEqual(f.getMonth(),date.getMonth())){
            console.log('done')
            const r={"_id":element._id};
    
           doctor.patientsOfThisMonth.push(r)
       }
        console.log(f)
      
        
    });
        const result={doctor,appointments,articles}
        //const doctor =await Product.find({_id:id})
       if(!result){
    throw createError(404,"Product does not exist")
    
       }
      
        res.send(result)
    } catch (error) {
        console.log(error.message);
        if(error instanceof mongoose.CastError){
    
            next(createError(400,"Invalid product id"))
            return;
        }
        next(error);
    }
    
    
    }


}