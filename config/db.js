const mongoose = require("mongoose");


const dbConnection = () => mongoose.connect('mongodb+srv://abdelrahman:@cluster0.olod5.mongodb.net/testsctora').then((result)=>{
    console.log("db connected");
}).catch((err)=>{
    console.log("db not connected" , err);
})




module.exports = dbConnection;
