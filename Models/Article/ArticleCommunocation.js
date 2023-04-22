const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const ArticleCommunicationSchema =new Schema
({
    ArticleId:{
        type:ObjectId,
        ref:'Article'
    },
    Likes:[{DoctorId:{type:ObjectId,ref:'Doctor' }}],
    
    Comments:[
        {
         Doctor:{type:ObjectId,ref:'Doctor'},
         Content:{type:String},
         Time:{type:String}
        }],
});
const myDB =mongoose.connection.useDb('Article');
const Article =myDB.model('ArticleCommunication',ArticleCommunicationSchema);

module.exports=Article;