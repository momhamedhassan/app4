const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const ArticleCommunicationSchema =new Schema
({
    Likes:[{Doctor:{type:ObjectId,ref:'AgoraUser' }}],
    Comments:
        [{
         Doctor:{type:ObjectId,ref:'AgoraUser'},
         Content:{type:String},
         Time:{type:String}
        }],
});
const myDB =mongoose.connection.useDb('Article');
const Article =myDB.model('ArticleCommunication',ArticleCommunicationSchema);

module.exports=Article;