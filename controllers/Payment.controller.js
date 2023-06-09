const createError =require('http-errors');
const { default: mongoose } = require('mongoose');
const {agoraSignAccessToken}=require('../Database/jwt_helper')

module.exports=
{postPayment:async(req,res,next)=>{
    const userId=req.payload.aud.replace(/['"]+/g, '');
    console.log('userId',userId)
    try 
    {
        const paymentToken =await agoraSignAccessToken(userId,'5m');   
        res.send(paymentToken);
    } catch (error) {
        console.log(error.message);
    }

}


}