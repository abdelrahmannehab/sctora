const handlerValidation = require('../../../middlewear/validation');
const { CompanyRegisterValidators, CompanyLoginValidators, CompanyUpdateValidators } = require('../company.validation');
const { getAllCompaniesHandlr,
        addCompanyHandlr,
        updateCompanyHandlr,
        CompanyRegistration,
        CompanyLogin
    } = require('../controller/company.controller');

const router = require('express').Router()


router.get("/companies", getAllCompaniesHandlr);
router.get("/companies/:id",getAllCompaniesHandlr);
router.post("/companies",addCompanyHandlr);
router.post("/companies",handlerValidation(CompanyRegisterValidators),CompanyRegistration);
router.post("/companies",handlerValidation(CompanyLoginValidators),CompanyLogin);
router.patch("/companies/:id",handlerValidation(CompanyUpdateValidators),updateCompanyHandlr);

module.exports = router