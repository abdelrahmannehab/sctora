const mongoose = require("mongoose");


const dbConnection = async() =>{
    
    return await mongoose.connect(process.env.connection_String ).then((result)=>{
    console.log("db connected")
}).catch((err)=>{
    console.log("db not connected" , err);
})
}



module.exports = dbConnection;
