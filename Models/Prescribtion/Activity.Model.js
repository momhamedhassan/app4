const mongoose= require('mongoose')
const Schema=mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const ActivitySchema = new Schema({
    
        image:{type:String},
        Name:{type:String},
        Time:{type:String}
    
});


const myDB =mongoose.connection.useDb('Activities');
const Activity =myDB.model('Activities',ActivitySchema);
module.exports=Activity;