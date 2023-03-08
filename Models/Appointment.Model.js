const mongoose= require('mongoose')
const Schema=mongoose.Schema;
const AppointmentSchema = new Schema({
    PatientId:{
        type:String
    },
    DoctorId:{
        type:String
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