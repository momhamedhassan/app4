const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const DoctorExperienceSchema =new Schema({
    workedArea:{type:String},
    degrees:[String],
    degreeImg:[String],
    DoctorId:{type:String}
})

const DoctorExperience = mongoose.model('Experience',DoctorExperienceSchema);
module.exports=DoctorExperience;