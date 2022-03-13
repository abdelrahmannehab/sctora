const mongoose = require('mongoose');
const companySchema = require('../Schema/company.schema');

const Company = mongoose.model("company",companySchema)




module.exports = Company;