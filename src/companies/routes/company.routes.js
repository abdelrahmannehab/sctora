const { getAllCompaniesHandlr,
        addCompanyHandlr,
        updateCompanyHandlr,
        CompanyRegistration
    } = require('../controller/company.controller');

const CompanyRouter = require('express').Router()


CompanyRouter.get("/companies", getAllCompaniesHandlr);
CompanyRouter.get("/companies/:id",getAllCompaniesHandlr);
CompanyRouter.post("/companies",addCompanyHandlr);
CompanyRouter.post("/CompaniesRegistration",CompanyRegistration);
CompanyRouter.put("/companies/:id",updateCompanyHandlr);

module.exports = CompanyRouter