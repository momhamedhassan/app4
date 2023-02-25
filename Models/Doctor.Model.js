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

const Doctor =mongoose.model('doctor',DoctorSchema);

module.exports=Doctor;