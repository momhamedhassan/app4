const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const PatientSchema =new Schema({
dignoses:[{type:String}]
});
const myDB =mongoose.connection.useDb('Patient');
const Patient = myDB.model('patientinfo',PatientSchema);

module.exports=Patient;