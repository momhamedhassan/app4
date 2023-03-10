const mongoose= require('mongoose')
const Schema=mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const AppointmentSchema = new Schema({
    PatientId:{
        type:String
    },
    Patient:{
        type:ObjectId,ref:'Patient'
    }
    ,
    Doctor:{
        type:ObjectId,ref:'Doctor'
    },
    AppointmentDate:{
        type:String
    },
    AppointmentTime:{ 
        type:String
    },
    PateintRequest:{
        type:String
    }
});

const myDB =mongoose.connection.useDb('Appointments');
const appointment=myDB.model('appointment',AppointmentSchema);

module.exports=appointment;