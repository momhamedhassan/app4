const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const DoctorSchema =new Schema({

doctorSpeciality:{
    type:String
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
}


});

const myDB =mongoose.connection.useDb('RestApi');
const Doctor =myDB.model('Doctor',DoctorSchema);

module.exports=Doctor;