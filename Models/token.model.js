const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const TokenSchema =new Schema({
token:{
type:String,required:true

},
App:{
    type:String,required:true
},
channel:{
    type:String,required:true
}

});

const Token =mongoose.model('token',TokenSchema);

module.exports=Token;