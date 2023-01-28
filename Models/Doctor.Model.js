const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const DoctorSchema =new Schema({
doctorName:{
type:String,required:true

},
doctorSpeciality:{
    type:String,required :true
}

});

const Doctor =mongoose.model('doctor',DoctorSchema);

module.exports=Doctor;