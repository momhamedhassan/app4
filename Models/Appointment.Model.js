const mongoose= require('mongoose')
const Schema=mongoose.Schema;
const Prescribtion=require('../Models/Prescribtion.Model');
const ObjectId =mongoose.Types.ObjectId;
const AppointmentSchema = new Schema({
   
    Patient:{
        type:ObjectId,ref:'AgoraUser'
    }
    ,
    Doctor:{
        type:ObjectId,ref:'AgoraUser'
    },
    AppointmentDate:{
        type:String
    },
    AppointmentTime:{ 
        type:String
    },
    PateintRequest:{
        type:String
    },
    duration:{
        type:String
    },
    Done:{
        type:Boolean,
        default:false
    },
    accepted:{type:Boolean,default:false},
    canceled:{type:Boolean,default:false},
    Prescribtion:{
        type:ObjectId,ref:'Prescribtion'
    }
});
AppointmentSchema.post('save',async function(next){
    const patientId=mongoose.Types.ObjectId(this.Patient);
    const doctorId =mongoose.Types.ObjectId(this.Doctor);
    try {
        console.log("...hello form middleware ...",this.Prescribtion)
       if(this.Prescribtion==null){
        
        if(patientId && doctorId) {
        const prescribtion=await Prescribtion.create(
            {PatientId:patientId,
            DoctorId:doctorId,
            Appointment:this._id});

        const addPrescrebtionToAppointment=await appointment.findByIdAndUpdate(
            {_id:this._id},
            {Prescribtion:prescribtion._id},
            {new:true})
       console.log(addPrescrebtionToAppointment)
    }

}
       
            
         
    } catch (error) {
        next(error)
    }
    })

const myDB =mongoose.connection.useDb('Appointments');
const appointment=myDB.model('appointment',AppointmentSchema);



module.exports=appointment;