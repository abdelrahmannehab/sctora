
const { auth} = require("../../middlewear/auth");
const handelValidation = require("../../middlewear/handelValidation");
const { ActorupdateValidator } = require("../Actor/Controller/actor.validation");
const {CompanyRegister,CompanyLogin,CompanyProfile,CompanyEditProfilePic,getAllCompanies, updateCompanyHandlr} = require("./Controller/company")
const { CompanyRegisterValidator, CompanyUpdateValidator } = require("./Controller/company.validation");


const router = require("express").Router();





//Register
router.post('/company/register', CompanyRegisterValidator, handelValidation(), CompanyRegister)
//Login
router.post('/company/login', CompanyRegisterValidator[1,2], handelValidation(), CompanyLogin)
//profile
router.get('/company/profile', auth(),CompanyProfile)
router.patch('/company/profile/picture', auth(),CompanyEditProfilePic)

//getAllActorsHandlr
router.get('/admin/getAllCompany', getAllCompanies)

//update
router.patch("/company/update/:id",CompanyUpdateValidator, handelValidation(),updateCompanyHandlr);



module.exports = router;