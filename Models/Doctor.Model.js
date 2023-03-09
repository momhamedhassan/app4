const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const DoctorSchema =new Schema({
doctorName:{
type:String,
required:true

},
doctorSpeciality:{
    type:String,required :true
},
rating:{
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

});

const myDB =mongoose.connection.useDb('RestApi');
const Doctor =myDB.model('Doctor',DoctorSchema);

module.exports=Doctor;