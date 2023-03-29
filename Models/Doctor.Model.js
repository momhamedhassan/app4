const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const DoctorSchema =new Schema({

doctorName:{
type:String,
required:true

},
doctorSpeciality:{
    type:String,required :true
},
Rank:{
    type:String
},
location:{
    type:String
},
experience_years:{
    type:String
},
about_doctor:{
    type:String
},
 doctorImgUrl:{
type:String
},
patientsOfThisMonth:[{
    type:ObjectId,
    ref:'PatientOfThisMonth'
}],
savedArticles:[{
    type:ObjectId,
    ref:'SavedArticles'
}]


});

const myDB =mongoose.connection.useDb('RestApi');
const Doctor =myDB.model('Doctor',DoctorSchema);

module.exports=Doctor;