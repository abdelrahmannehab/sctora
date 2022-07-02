

const { body } = require('express-validator')

const ActorRegisterValidator = [
    body("UserName").isString().withMessage('in-valid UserName validation'),
    body("ActorEmail").isEmail().withMessage('in-valid ActorEmail Syntax'),
    body("ActorPassword").isString().withMessage('in-valid ActorPassword '),
    body("Gender").isString().withMessage('in-valid Gender'),
    body("Age").isString().withMessage('in-valid Age'),
    body("Height").isString().withMessage('in-valid Height'),
    body("Weight").isString().withMessage('in-valid Weight'),
    body('ConfirmationPassword').custom((value, { req }) => {
        if (value !== req.body.ActorPassword) {
          throw new Error('Confirmation Password does not match ActorPassword');
        }
        return true;
      }),
    
    
]
const ActorupdateValidator = [
  body("UserName").isString().withMessage('in-valid UserName validation'),
  body("ActorEmail").isEmail().withMessage('in-valid ActorEmail Syntax'),
  body("ActorPassword").isString().withMessage('in-valid ActorPassword '),
  body("Gender").isString().withMessage('in-valid Gender'),
  body("Age").isString().withMessage('in-valid Age'),
  body("Height").isString().withMessage('in-valid Height'),
  body("Weight").isString().withMessage('in-valid Weight'),
 
]



module.exports = {
  ActorRegisterValidator,
  ActorupdateValidator
}