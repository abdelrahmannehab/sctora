const  mongoose = require('mongoose');

const { Schema } = mongoose
const companySchema = new Schema({
    CompanyName: {type:String , required : true},
    CompanyManagerName : {type:String , required: true},
    CompanyAddress : {type:String , required: true},
    CompanyEmail : {type: String, required: true,unique:true},
    CompanyPassword : {type: String, required: true},
    

},{
    timestamps: true
});




module.exports = companySchema;