
const mongoose = require('mongoose');

const connectDB =async()=>{
    return await mongoose.connect(process.env.connection_String).then((result)=>{
        console.log("DB Connected");
    }).catch((err)=>{
        console.log("Connection error");
    })
}


module.exports= connectDB;