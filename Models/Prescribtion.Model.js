const mongoose=require('mongoose');
const appointment = require('./Appointment.Model');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const PrescribtionSchema =new Schema
({
PatientId:{type:ObjectId,ref:"AgoraUser"},

DoctorId:{type:ObjectId,ref:"AgoraUser"},

Appointment:{type:ObjectId,ref:'Appointment'},

remainingPills:[{
    pillId:{type:ObjectId,ref:"Pill"}
}],

allDone:{type:Number},

Pills:
[
{   
    pillId:{type:ObjectId,ref:"Pill"},
    StartDate:{type:String},
    FinishDate:{type:String},
    PillTime:{String},
    HowToUse:{type:String},
    Description:{type:String},
    dose:{type:Number},
    nextDose:{type:Number},
    //Taken helps us to make notification
    allTaken:{type:Boolean,default:false},
    //NumberOfUse calculated from How to use
    NumberOfUse:{type:Number},
    turn:[{TimeOfturn:{type:String}}],
    MissedTurn:[{TimeOfturn:{type:String}}]
}
],
Activities:
    [{
        ActivityId:{type:ObjectId,ref:"Activity"},
        Taken:{type:Boolean},
    }],

NextAppointment:{
    type:ObjectId,ref:'Appointment'
}

});







const myDB =mongoose.connection.useDb('prescribtions');
const prescribtion =myDB.model('prescribtion',PrescribtionSchema);
module.exports=prescribtion;