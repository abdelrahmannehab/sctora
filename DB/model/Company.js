
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const companySchema = new mongoose.Schema({

    CompanyName: {type:String , required : true},
    CompanyManagerName : {type:String , required: true},
    CompanyAddress : {type:String , required: true},
    CompanyEmail : {type: String, required: true,unique:true},
    CompanyPassword : {type: String, required: true},
    CompanyProfilePic: String,
    PhoneNumber: String,
    ShareCompanyProfile: String,
    

},{
    timestamps: true
});


companySchema.pre("save", async function(next){
     
 this.CompanyPassword = await bcrypt.hash(this.CompanyPassword, parseInt( process.env.SALT))
 next();

})
const companyModel = mongoose.model('Company', companySchema)


module.exports = companyModel;