const mongoose= require('mongoose')
const Schema=mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const PillSchema = new Schema({
    
    Image:{type:String},
    PillName:{type:String},
    Number:{type:String}
    
    
});


const myDB =mongoose.connection.useDb('Pills');
const Pill =myDB.model('pill',PillSchema);
module.exports=Pill;