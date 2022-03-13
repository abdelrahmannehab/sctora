const mongoose = require("mongoose");


const dbConnection = () => mongoose.connect('mongodb+srv://abdelrahman:Mm01274098137@cluster0.olod5.mongodb.net/sctora').then((result)=>{
    console.log("db connected");
}).catch((err)=>{
    console.log("db not connected" , err);
})




module.exports = dbConnection;
