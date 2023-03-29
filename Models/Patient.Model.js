const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const PatientSchema =new Schema({
PatientName:{
type:String,
},
Patient_Age:{
    type:String
},
 PatientImgUrl:{
type:String
},
Appointments:[{
    type:ObjectId,
    ref:'Appointments'

}]
});
const myDB =mongoose.connection.useDb('Patient');
const Patient =myDB.model('patientinfo',PatientSchema);

module.exports=Patient;