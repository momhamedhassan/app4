const Joi=require('@hapi/joi')

const authSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(2).required()
})
const AgoraUserAuthSchema =Joi.object({
    avatar:Joi.string().allow(null).allow(''),
    name:Joi.string().allow(null).allow(''),
    type:Joi.number().required(),
    email:Joi.string().email().max(50).required(),
    open_id:Joi.string().allow(null).allow(''),
    description:Joi.string().allow(null).allow(''),
    phone:Joi.string().allow(null).allow(''),
    online:Joi.number().allow(null).allow(''),
    password:Joi.string().min(2).allow(null).allow(''),
    userType:Joi.number().allow(null).allow('')

})

module.exports={
    authSchema,
    AgoraUserAuthSchema
}