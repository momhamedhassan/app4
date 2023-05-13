const mongoose= require('mongoose')
const Schema=mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const SchaduleSchema = new Schema({
  PatientId:{type:ObjectId,ref:"Patient"},
  Appointment:[{type:ObjectId,ref:"Appointment"}],
  Pills:[
    {
    Image:{type:String},
    PillName:{type:String},
    Number:{type:String},
    StartDate:{type:String},
    FinishDate:{type:String},
    PillTime:{String},
    HowToUse:{type:String}}],
   Activities:[{
        image:{type:String},
        Name:{type:String},
        Time:{type:String}
    }]
});

const myDB =mongoose.connection.useDb('Schadule');
const Schadule=myDB.model('Schadule',SchaduleSchema);
module.exports=Schadule;
