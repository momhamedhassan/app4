const jwt =require('jsonwebtoken');
const createError=require('http-errors')

module.exports={
    signAccessToken:(userId,expire_date)=>{
      console.log('...hello from sign access token ....'+userId+expire_date)
        return new Promise((resolve,reject)=>{
            const payload={
                name:"yours truly"
            }
            const secret=process.env.ACCESS_TOKEN_SECRET
            const options={
                expiresIn:expire_date,
                audience:userId
            }
            jwt.sign(payload,secret,options,(err,token)=>{
                if(err)
                {
                    reject(createError.InternalServerError())
               
                }
                resolve(token)
                return token
            })
        })
    },
    
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        console.log(token)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
          if (err) {
            const message =
              err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
            return next(createError.Unauthorized(message))
          }
          req.payload = payload
          console.log(payload);
          next()
        })





      },agoraSignAccessToken:async function(userId,expire_date){
        console.log('...hello from Agora sign access token ....')
        console.log('...userId...'+userId);
        console.log('...expire_date...'+expire_date);
        
        const payload={
          name:"yours truly"
      }
      const secret=process.env.ACCESS_TOKEN_SECRET
      const options={
          expiresIn:expire_date,
          audience:JSON.stringify(userId)
      }
          return  jwt.sign(payload,secret,options);
          
      },verifyPayment:(req,res,next)=>{
        const paymentToken=req.body.paymentToken;
        jwt.verify(paymentToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
          if (err) {
            const message =
              err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
            return next(createError.Unauthorized(message))
          }
          req.paymentPayload = payload
          next()
        })
      }


}