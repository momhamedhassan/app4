const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const ArticleSchema =new Schema
({
Doctor:{
    type:ObjectId,
    ref:'Doctor'
},
Content:{
    type:String
},
Date:{
type:String
},
ArticleTitle:{
    type:String
},
ArticleCommunication:{
    type:ObjectId,
    ref:'ArticleCommunication'
}
});
const myDB =mongoose.connection.useDb('Articles');
const Article =myDB.model('Article',ArticleSchema);

module.exports=Article;