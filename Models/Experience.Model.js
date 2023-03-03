const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const DoctorExperienceSchema =new Schema({
    workedArea:{type:String},
    degrees:[String],
    degreeImg:[String],
    DoctorId:{type:String}
})
const myDB =mongoose.connection.useDb('RestApi');
const DoctorExperience = myDB.model('Experience',DoctorExperienceSchema);
module.exports=DoctorExperience;