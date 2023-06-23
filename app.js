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
const admin=require('firebase-admin');
const fcm=require('@diavrank/fcm-notification');
const serviceAccount=require('./final-project-agora-firebase-adminsdk-bnzot-b86370206b.json')
const {RtcTokenBuilder, RtcRole, RtmTokenBuilder, RtmRole} = require('agora-access-token');
const AgoraUser=require('./Models/AgoraUser');
const app =express();
require('dotenv').config();
const AuthRoute=require('./route/Auth.route');
const createError=require('http-errors');
app.use(express.json());
const dotenv =require('dotenv').config();
const {verifyAccessToken}=require('./Database/jwt_helper')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  messagingSenderId:'778941570464'
});


const nocache = (_, resp, next) => {
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.header('Expires', '-1');
    resp.header('Pragma', 'no-cache');
    next();
  }



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
    const date=new Date(2023,5,13,6,18)
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
    console.log("hello from bind fcm token")
    const userId=req.payload.aud.replace(/['"]+/g, '');
    console.log(userId)
    const fcmtoken=req.query.fcmtoken;
    console.log(fcmtoken)

    try {
        if(!fcmtoken){
            res.json({code:-1,data:"",msg:"error getting the token"})
        }
        const updateFcmToken=await AgoraUser.findByIdAndUpdate({_id:userId},{fcmtoken:fcmtoken},{new:true});
        console.log(updateFcmToken);
        res.json({code:-1,data:"",msg:"success"})
    } catch (error) {
    
        console.log(error.message);
        throw createError(404," error fcm token")
    }
})
app.post('/api/send_notice',verifyAccessToken,async (req, res)=> {
  console.log("hello from send notice")
    //caller information
    const userId=req.payload.aud.replace(/['"]+/g, '');
    console.log("... sender id ...",userId);
    const caller=await AgoraUser.findById({_id:userId});
    const user_avatar = caller.avatar;
    const user_name = caller.name;
  
    //callee information
    const to_token  = req.query.to_token;
    const call_type = req.query.call_type;
    const to_avatar = req.query.to_avatar;
    const to_name   = req.query.to_name;
    const doc_id    = req.query.doc_id || '';
    //const fcmtoken  = req.query.fcmtoken;
    //get the other user
    const otherUser=await AgoraUser.findById({_id:to_token});
    console.log(otherUser)

    if (!res) {
       res.status(404).json({ code: -1, data: '', msg: 'user does not exist' });
    }
    const device_token = otherUser.fcmtoken;
  
    try {
      if (device_token) {
        if (call_type === 'cancel') {
          const message = {
            token: device_token,
            data: {
              token: userId,
              avatar: user_avatar,
              name: user_name,
              doc_id: doc_id,
              call_type: call_type,
            },
          };
         const result=await admin.messaging().send(message);
         console.log(result)
         res.status(200).json({ code: 0, data: to_token, msg: 'success' }); 
           
        } else if (call_type === 'voice') {
          const message = {
            token: device_token,
            data: {
              token: userId,
              avatar: user_avatar,
              name: user_name,
              doc_id: doc_id,
              call_type: call_type,
            },
            android: {
              priority: 'high',
              notification: {
                channel_id: 'xxx',
                title: 'Voice call made by ' + user_name,
                body: 'Please click to answer the voice call',
              },
            },
          };
        //   admin.messaging().send(message,function(err,res){
        //   if(err){
        //       throw createError(500,`error fcm token ${err}` )
        //   }else{
        //     res.status(200).json({ code: 0, data: to_token, msg: 'success' });
        //   }
        //  });
         const result=await admin.messaging().send(message);

         console.log(result)
          res.status(200).json({ code: 0, data: to_token, msg: 'success' }); 
        
        } else if (call_type === 'video') {
          const message = {
            token: device_token,
            data: {
              token: userId,
              avatar: user_avatar,
              name: user_name,
              doc_id: doc_id,
              call_type: call_type,
            },
            android: {
              priority: 'high',
              notification: {
                channel_id: 'xxx',
                title: 'Video call made by ' + user_name,
                body: 'Please click to answer the video call',
              },
            },
          };
         
          const result= admin.messaging().send(message);
          
          console.log(result)
          res.status(200).json({ code: 0, data: to_token, msg: 'success' });
        } else {
           res.status(400).json({ code: -1, data: '', msg: 'invalid call type' });
        }
      } else {
         res.status(400).json({ code: -1, data: '', msg: 'device token is empty' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
       res.status(500).json({ code: -1, data: '', msg: 'failed to send message' });
    }
  })
  app.post('/api/get_rtc_token', nocache,verifyAccessToken ,async(req, res) => {
    const APP_ID = process.env.APP_ID;
    console.log(APP_ID);
    const APP_CERTIFICATE = process.env.APP_CERTIFICATE;
    console.log(APP_CERTIFICATE);
    // set response header
    res.header('Access-Control-Allow-Origin', '*');
    // get channel name
    const channelName = req.query.channel_name;
    if (!channelName) {
     res.status(400).json({ 'error': 'channel is required' });
    }
    // get uid
    let uid =0;
    // get role
    let role=RtcRole.SUBSCRIBER;
    // get the expire time
    let expireTime = 7200;
    // calculate privilege expire time
    const currentTime = Math.floor(Date.now() / 1000);

    const privilegeExpireTime = currentTime + expireTime;
    // build the token
    let token= RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
    console.log(token)
    // return the token
    if(!token){
        res.json({code:-1,data:'',msg:"token error"})
    }
    res.json({code:0,data:token,msg:"success"})
   
  } );  

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