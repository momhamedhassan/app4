const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const DoctorReviewSchema =new Schema({
img:{
    type:String
},
patientName:{
    type:String
},
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

const DoctorReview = mongoose.model('Reviews',DoctorReviewSchema);

module.exports=DoctorReview;