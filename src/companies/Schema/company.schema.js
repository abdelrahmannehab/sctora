const  mongoose = require('mongoose');

const { Schema } = mongoose
const companySchema = new Schema({
    companyName: {type:String},
    email : String,
    //password 

},{
    timestamps: true
});




module.exports = companySchema;