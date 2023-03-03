const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const DoctorReviewSchema =new Schema({
img:{
    type:String
},
patientName:{
    type:String
},
DoctorId:{type:String},
Rating:{
    type:String
},
feedBackContent:{
    type:String
},
date:{
    typee:String
},
waitingTime:{type:String}
,
bedSideManner:{type:String},
consulting:{type:String},


});
const myDB =mongoose.connection.useDb('RestApi');
const DoctorReview = myDB.model('Reviews',DoctorReviewSchema);

module.exports=DoctorReview;