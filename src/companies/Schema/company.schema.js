const  mongoose = require('mongoose');

const { Schema } = mongoose
const companySchema = new Schema({
    companyName: {type:String},
    email : {type: String},
    password : {type: String}

},{
    timestamps: true
});




module.exports = companySchema;