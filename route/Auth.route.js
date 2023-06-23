const bcrypt=require('bcrypt')
const express =require('express')
const router=express.Router()
const createError=require('http-errors')
const nodemailer=require("nodemailer");
const AgoraUser=require('../Models/AgoraUser')
const Patient =require("./../Models/Patient.Model")
const {authSchema,AgoraUserAuthSchema}=require('../Database/validation_schema')
const {signAccessToken,agoraSignAccessToken}=require('../Database/jwt_helper');
const Doctor = require('../Models/Doctor.Model');

let transporter =nodemailer.createTransport({
  service:"gmail",
  auth:{
      user:process.env.AUTH_EMAIL,
      pass:process.env.AUTH_PASS

  }
});

transporter.verify((error,success)=>{
  if(error){
      console.log(error);
  }else{
      console.log("Ready for messages");
      console.log(success)
  }
})
router.get('/',async(req,res,next)=>{
const users=await AgoraUser.find({});
res.json(users)
});
router.post('/register',async(req,res,next)=>{
    try {
        
        const result=await authSchema.validateAsync(req.body)
        const doesExist =await User.findOne({email:result.email}).exec();

        if(doesExist){
            throw createError.Conflict(`${result.email} is already been regitered `)
        }

        const user=await User.create(result)
        const accessToken=await signAccessToken(user.id)
        res.send({accessToken})

    } catch (error) {
        if(error.isJoi===true)error.status=422
        next(error)
    }
})
router.post('/login',async(req,res,next)=>{
  const token_expire_date='1h';
  try {
    const result=await authSchema.validateAsync(req.body)
    
    const user=await User.findOne({email:result.email})
    if(!user)throw createError.NotFound("user not register")
    
    const isMatch=await user.isValidPassword(result.password)
    if(!isMatch)throw createError.Unauthorized('Username/password not valid')

    const accessToken=await signAccessToken(user.id,token_expire_date)
   
    res.send({accessToken})
  } catch (error) {
    if(error.isJoi===true)return next(createError.BadRequest("Invalid Username/Password"))
    next(error)
  }
})
router.post('/Agoralogin',async(req,res,next)=>{
   const email =req.body.email;
    console.log(email)
    const password=req.body.password;
    console.log(password)
    const type  =req.body.type;
    console.log(type)
    const userType=req.body.userType;
    console.log(userType)
    

  const mailOptions={
    from:process.env.AUTH_EMAIL,
    to: email,
    subject:"Verify Your Email",
    html:`<p> Welcome to care link </p>`
};

  const token_expire_date='365d';
  const access_token_expire_date='12h'
  console.log("hello from Agora login ")
  console.log("... result data ..."+req.body)
  try {
    const result=await AgoraUserAuthSchema.validateAsync(req.body)
    var user;
    let map = {};
    map['type'] = result['type'];
    map['open_id'] = result['open_id'];
   
    if(type==2){
       user=await AgoraUser.find(map)
    console.log(user)
    }
    else{
      console.log("...hello from type 6,7")
      user=await AgoraUser.find({email})
      console.log(user)
    }

     if(!user.length ){
      console.log('... user does not exist ...')
 
      if(type==2 ||type==7)
      {
      if(type==7){
        console.log("...creating password ...")
        const salt=await bcrypt.genSalt(10)
        console.log(salt)
        const hashedPassword=await bcrypt.hash(password,salt);
        console.log(hashedPassword)
        result['password']=hashedPassword;
        console.log(result)
      }

      //create user to get id to use it generating token

      const newUser=await AgoraUser.create(result);
      transporter.sendMail(mailOptions)
      
    
      

      console.log("new user ..."+newUser)
      //insert data to result 
      result['token']=await agoraSignAccessToken(newUser._id,token_expire_date);
      result['created_at']=new Date(2023, 5, 28, 20, 0, 0).getTime();
      result['access_token']=await agoraSignAccessToken(newUser._id,access_token_expire_date)
      result['expire_date']=new Date(new Date(2023, 5, 28, 20, 0, 0).getTime() + 1 * 24 * 60 * 60 * 1000)
     
      //update item that we just created by result object
      const agoraUser=await AgoraUser.findByIdAndUpdate({_id:newUser._id},result,{new:true})
    
    
      
    res.json({code:0,data:agoraUser,msg:'user has been created'})
      // console.log("... populated ...",populatedUser);
  }      
      else{
        res.json({code:-1,data:{},msg:'user not exist and can not login with it'});
      }
      
      }
     else{
           
      console.log('search is not empty')
    
    if(type==2 || type==6){
      if(type==6){
        console.log("...hello from compare")
        const isMatch=await user[0].isValidPassword(result.password);

      // const isMatch = await bcrypt.compare(result.password, user.password); 
       console.log(isMatch)
       if(!isMatch){
        throw createError.NotFound("incorrect password")
        }
      }
      const access_token=await agoraSignAccessToken(user[0]._id,access_token_expire_date);
      const expire_date=new Date(new Date(2023, 5, 28, 20, 0, 0).getTime() + 1 * 24 * 60 * 60 * 1000);
      const agoraUser=await AgoraUser.findByIdAndUpdate({_id:user[0]._id},{access_token:access_token,expire_date:expire_date},{new:true});
      
      res.json({code:0,data:agoraUser,msg:'user information updated'});}
     
     else{
      res.json({code:-1,data:{},msg:'user exist and you can not signup with it'});
     }}
  } catch (error) {
    
   res.json({code:-1,data:{},msg:'error'})
  }
})
router.post('/reset-password',async(req,res,next)=>{
  const {email}=req.body;
  const mailOptions={
    from:process.env.AUTH_EMAIL,
    to: email,
    subject:"reset password",
    html:`<p>$  </p>`
};

  const user =await AgoraUser.find({email})
  console.log(user)
  if(user[0]){
    const token=await agoraSignAccessToken(user[0]._id,'15m');

    res.json({code:0,data:{token},msg:'reset password token'})
  }
  else{
  res.json({code:-1,data:{},msg:'user does not exist'})}
})

router.post('/confirm-reset-password',async(rq,res,next)=>{
  const {email ,passwordToken}= req.body;

})


router.post('/refresh-token',async(req,res,next)=>{
    res.send("refresh token route")
})
router.delete('/logout',async(req,res,next)=>{
    res.send("logout route")
})
// router.post('/bind_fcmtoken',async(req,res,next)=>{
//   const {token,fcmtoken}=req.body;
//   if(!fcmtoken){
//     res.json({'code':-1,data:{},msg:"error getting the token"})
//   }
//   const User=await AgoraUser.findByIdAndUpdate({token},{fcmtoken},{new:true})
//   res.json({'code':0,data:{},msg:"success"})
// })


module.exports=router;