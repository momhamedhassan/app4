require('./Database/intialDataBaseConnection')();
const express =require ('express');
const schadule=require('node-schedule');
const DoctorRoute =require('./route/Doctor.route');
const ReviewRoute=require('./route/Review.route');
const ExperienceRoute=require('./route/DoctorExperience');
const PatientRoute=require('./route/Patient.route')
const AppointmentRoute=require('./route/Appointments.route')
const ArticleRoute=require('./route/Article.route');
const ArticleCommunicationRoute=require('./route/Articlecommuication.route')
const PrescribtionRoute=require('./route/Prescribtion.route')
const ReportRoute=require('./route/Report.route')
const DoctorHomePageRouter=require('./route/DoctorHomePage.route')
const PateintSchaduleRouter=require('./route/PatientSchadule.route')
const PatientHomePageRouter=require('./route/PatientHomePage.route');
const PillRouter=require('./route/prescribtion/Pill.route')
const ActivityRouter=require('./route/prescribtion/Activity.route')
const PaymentRoute=require('./route/payment.route')
const NewArticleRoute=require('./route/NewArticleRoute')
const AgoraUser=require('./Models/AgoraUser');
const app =express();
require('dotenv').config();
const AuthRoute=require('./route/Auth.route');
const createError=require('http-errors');
app.use(express.json());
const dotenv =require('dotenv').config();
const {verifyAccessToken}=require('./Database/jwt_helper')



app.use('/api/Doctors',verifyAccessToken,DoctorRoute);

app.use('/Reviews',ReviewRoute);
app.use('/DoctorExperience',ExperienceRoute);
app.use('/Patients',PatientRoute)
//login
app.use('/api',AuthRoute)
//

//appointmnet for patient and doctor
app.use('/api/Appointments',verifyAccessToken,AppointmentRoute);

// Admin
app.use('/api/Activity',ActivityRouter)
app.use('/api/Pills',PillRouter)
//

app.use('/api/payment',verifyAccessToken,PaymentRoute)

app.use('/Articles',ArticleRoute);
app.use('/api/ArticleCommunication',verifyAccessToken,ArticleCommunicationRoute);
app.use('/api/Prescribtion',verifyAccessToken,PrescribtionRoute);
app.use('/Report',ReportRoute);
app.use('/DoctorHomePage',DoctorHomePageRouter);
app.use('/patientSchadule',PateintSchaduleRouter);
app.use('/PatientHomePage',PatientHomePageRouter);

app.get('/getuser/:id',async(req,res,next)=>{
    const id=req.params.id;

try {
    const user=await AgoraUser.findById({_id:id})
    res.send(user);
} catch (error) {

    console.log(error.message);
}
    
}

)

app.get('/api/test',async(req,res,next)=>{
    const date=new Date(2023,5,13,6,18,00)
    // Do task at a date/time
    schadule.scheduleJob(date,function(){
        console.log("Task complete @ "+ new Date());
    })

})

app.get('/do-something', (req, res) => {
    // Set a timeout for 10 seconds
    timeout = setTimeout(function() {
      console.log('This will be executed after 10 seconds.');
      // Set an interval for 5 seconds
      interval = setInterval(
        function() {
        console.log('This will be executed every 5 seconds until user does something.');
        // Check if user has done something
        if (userHasDoneSomething()) {
          // Clear the timeout and interval
          clearTimeout(timeout);
          clearInterval(interval);
          console.log('User has done something. Stopping the automatic execution.');
          res.send('User has done something. Stopping the automatic execution.');
        }
      }, 5000);
    }, 10000);
  
    res.send('Started the automatic execution. This will be executed after 10 seconds.');
  });
  
  function userHasDoneSomething() {
    // Check if user has done something
    // Return true if user has done something, otherwise false
  }

app.use('/api/articles',verifyAccessToken,NewArticleRoute);

app.post('/api/bind_fcmtoken',verifyAccessToken,async(req,res,next)=>{
    const userId=req.payload.aud.replace(/['"]+/g, '');
    const fcmtoken=req.body.fcmtoken;

    try {
        if(!fcmtoken){
            res.json({code:-1,data:"",msg:"error getting the token"})
        }
        const updateFcmToken=await AgoraUser.findByIdAndUpdate({_id:userId},{fcmtoken:fcmtoken},{new:true});
        res.json({code:-1,data:updateFcmToken,msg:"success"})
    } catch (error) {
    
        console.log(error.message);
        throw createError(404," error fcm token")
    }
})

app.get('/api/Testing',async(req,res,next)=>{
    res.json({code:0});
})
app.use((req,res,next)=>{
    next(createError(404,"Not found"))
}
)
app.use((err,req,res,next)=>{

res.status(err.status || 500)
res.send({error:{status:err.status||500 ,message:err.message}})

})
const PORT =process.env.PORT ||3007

app.listen (PORT,()=>{
    
    console.log("server started on port "+PORT+'...')});