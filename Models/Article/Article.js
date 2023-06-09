const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const Articlecommuication=require('./ArticleCommunocation');
const ArticleSchema =new Schema
({
Doctor:{
    type:ObjectId,
    ref:'AgoraUser'
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
},
ArticleField:{
    type:String
}
});
ArticleSchema.post('save',async function(next){
    
    try {
        console.log("...hello form Article middleware ...")
        if(this.Articlecommuication==null){

            console.log("...hello form Arcticle Communication is null ...")
            console.log(this.ArticleCommunication);

        const ArticleCommunication=await Articlecommuication.create(
            {ArticleId:this._id});

        const addCommunicationToArticle=await Article.findByIdAndUpdate(
            {_id:this._id},
            {ArticleCommunication:ArticleCommunication._id},
            {new:true})
       console.log(addCommunicationToArticle)}

       else{
        console.log('there is articleCommunication you can not create new one ')
       }   
    } catch (error) {
        next(error)
    }
    })


const myDB =mongoose.connection.useDb('Articles');
const Article =myDB.model('Article',ArticleSchema);

module.exports=Article;