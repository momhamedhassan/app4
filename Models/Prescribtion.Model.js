const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const PrescribtionSchema =new Schema
({
PatientId:{type:ObjectId,ref:"Patient"},

DoctorId:{type:ObjectId,ref:"Doctor"},

Appointment:{type:ObjectId,ref:'Appointment'},

Pills:[
    {
type:ObjectId,ref:"Pill"
    }],

Activities:[
    {
        type:ObjectId,ref:"Activity"
    }],
NextAppointment:{
    type:ObjectId,ref:'Appointment'
}

});

const myDB =mongoose.connection.useDb('prescribtions');
const prescribtion =myDB.model('prescribtion',PrescribtionSchema);
module.exports=prescribtion;