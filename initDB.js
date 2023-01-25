const mongoose = require('mongoose')
module.exports = () =>{
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb+srv://cluster0.bshgjjp.mongodb.net/?retryWrites=true&w=majority",
    {
        dbname:"RestApi",
        user:"mohamed",
        pass:"mohamed",
        useNewUrlParser:true,
        useUnifiedTopology:true
        
    
    }).then(()=>{console.log('Mongodb connected ...');})
    .catch(err=>console.log(err.message))
    
    mongoose.connection.on('connected',()=>{
        console.log("Mongoose connected to database ...")
    })
    
    mongoose.connection.on('error',(err)=>{console.log(err.message)})
    
    mongoose.connection.on('disconnected',()=>{
        console.log("Mongoose connection id disconnected ...");
    
    })
    
    process.on('SIGINT',()=>{    
    mongoose.connection.close(()=>{
        console.log(
            "Mongoose connection is disconnected due to top app termination"
            );
            process.exit(0);
        });
    });



}