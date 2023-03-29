const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const ReportSchema =new Schema({
Prescribtion:{
    type:ObjectId,
    ref:'Prescribtion'
},
PateintCase:{
    type:String
},
Dignose:{
    type:String
}

})

const myDB =mongoose.connection.useDb('Reports');
const Report=myDB.model('Report',ReportSchema);

module.exports=Report;