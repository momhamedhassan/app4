require('./Database/intialDataBaseConnection')();
const express =require ('express');
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
app.use('/Prescribtion',PrescribtionRoute);
app.use('/Report',ReportRoute);
app.use('/DoctorHomePage',DoctorHomePageRouter);
app.use('/patientSchadule',PateintSchaduleRouter);
app.use('/PatientHomePage',PatientHomePageRouter);

app.get('/api/test',async(req,res,next)=>{res.json({code:0})})

app.use('/api/articles',verifyAccessToken,NewArticleRoute);

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