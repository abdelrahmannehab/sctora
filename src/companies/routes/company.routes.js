const { getAllCompaniesHandlr,
        addCompanyHandlr
    } = require('../controller/company.controller');

const router = require('express').Router()


router.get("/companies", getAllCompaniesHandlr);
router.get("/companies/:id",getAllCompaniesHandlr );
router.post("/companies",addCompanyHandlr );


module.exports = router