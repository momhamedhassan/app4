const mongoose= require('mongoose')
const Schema=mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const AppointmentSchema = new Schema({
   
    Patient:{
        type:ObjectId,ref:'Patient'
    }
    ,
    Doctor:{
        type:ObjectId,ref:'Doctor'
    },
    AppointmentDate:{
        type:Date
    },
    AppointmentTime:{ 
        type:String
    },
    PateintRequest:{
        type:String
    },
    duration:{
        type:String
    }
});

const myDB =mongoose.connection.useDb('Appointments');
const appointment=myDB.model('appointment',AppointmentSchema);



module.exports=appointment;