const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const PrescribtionSchema =new Schema
({

Appointment:{type:ObjectId,ref:'Appointment'},

Pills:{type:String},

Activity:{type:String},

DateOfUpCommingAppointment:{type:String},

PreviousAppointments:{type:ObjectId,ref:'PreviousAppointment'}



});

const myDB =mongoose.connection.useDb('prescribtions');
const prescribtion =myDB.model('prescribtion',PrescribtionSchema);
module.exports=prescribtion;