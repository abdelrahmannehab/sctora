const { getAllCompaniesHandlr,
        addCompanyHandlr,
        updateCompanyHandlr
    } = require('../controller/company.controller');

const router = require('express').Router()


router.get("/companies", getAllCompaniesHandlr);
router.get("/companies/:id",getAllCompaniesHandlr);
router.post("/companies",addCompanyHandlr);
router.put("/companies/:id",updateCompanyHandlr);

module.exports = router