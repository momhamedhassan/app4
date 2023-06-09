const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ObjectId =mongoose.Types.ObjectId;
const bcrypt=require('bcrypt')
const { number } = require('@hapi/joi')
const Patient = require('./Patient.Model')
const Doctor = require('./Doctor.Model')
const UserSchema =new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{type:String},
    email_verified_at:{type:Date},
    remember_token:{type:String},
    created_at:{type:String},
    updated_at:{type:String},
    access_token:{type:String},
    avatar:{type:String},
    description:{type:String},
    expire_date:{type:Date},
    fcmtoken:{type:String},
    online:{type:Number},
    open_id:{type:String},
    token:{type:String},
    type:{type:Number},
    phone:{type:String},
    userscol:{type:String},
    id:{type:Number},
    name:{type:String},
    patientId:{type:ObjectId,ref:'Patient'},
    userType:{type:Number},
    doctorId:{type:ObjectId,ref:'Doctor'}
    
})
UserSchema.methods.isValidPassword=async function(password){
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        throw error
    }
}
UserSchema.post('save',async function(next){
    try {
        console.log(this.userType)
        if(this.userType==1){  
            console.log("user type 1 =>Patient")
                    const patient=await Patient.create({});
                    console.log(patient)
                    const updateUser=await User.findByIdAndUpdate({_id:this._id},{patientId:patient._id});
                    console.log(updateUser);            
          }
          else if(this.userType==2){
            console.log("user type 2 =>Doctor")
                    const doctor=await Doctor.create({});
                    await User.findByIdAndUpdate({_id:this._id},{doctorId:doctor._id},{new:true});
            
          }else{throw createError.NotFound("invalid usertype")}
    } catch (error) {
        next(error)
    }
    })




const myDB =mongoose.connection.useDb('User');
const User =myDB.model('agoraUser',UserSchema);
module.exports=User;