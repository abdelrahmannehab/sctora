
const { body } = require('express-validator')

const CompanyRegisterValidator = [
    body("CompanyName").isString().withMessage('in-valid CompanyName validation'),
    body("CompanyEmail").isEmail().withMessage('in-valid ActorEmail Syntax'),
    body("CompanyPassword").isString().withMessage('in-valid ActorPassword '),
    body("CompanyManagerName").isString().withMessage('in-valid Company Manager Name'),
    body("CompanyAddress").isString().withMessage('in-valid Company Address'),
    body('ConfirmationPassword').custom((value, { req }) => {
        if (value !== req.body.CompanyPassword) {
          throw new Error('Confirmation Password does not match ActorPassword');
        }
        return true;
      }),
    
    
]
const CompanyUpdateValidator = [
  body("CompanyName").isString().withMessage('in-valid CompanyName validation'),
  body("CompanyEmail").isEmail().withMessage('in-valid ActorEmail Syntax'),
  body("CompanyPassword").isString().withMessage('in-valid ActorPassword '),
  body("CompanyManagerName").isString().withMessage('in-valid Company Manager Name'),
  body("CompanyAddress").isString().withMessage('in-valid Company Address'),

  
  
]


module.exports = {
    CompanyRegisterValidator,
    CompanyUpdateValidator
}