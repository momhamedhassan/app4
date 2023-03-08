const mongoose=require('mongoose');
const Schema = mongoose.Schema;
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
});
const myDB =mongoose.connection.useDb('Patient');
const Patient =myDB.model('patientinfo',PatientSchema);

module.exports=Patient;