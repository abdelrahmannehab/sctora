// const Joi = require('joi')

// const ActorRegisterValidators = {
//     body: Joi.object().required().keys({
//         UserName: Joi.string().required().messages({
//             'string.empty':'Sorry empty  Username is not accepted',
//             'string.base':'Sorry Only String value are accepted',
//     }),
//         Age: Joi.string().required(),
//         Gender: Joi.string().required(),
//         ActorEmail: Joi.string().required(),
//         Weight: Joi.string().required(),
//         Height: Joi.string().required(),
//         ActorPassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
//         ActorConfirmPassword: Joi.ref('ActorPassword'),
//     })
// }

// const ActorLoginValidators={
//     body: Joi.object().keys({
//         ActorEmail: Joi.string().email(),
//         ActorPassword:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
//     })
// }
// const ActorUpdateValidators = {
//     body: Joi.object().required().keys({
//         UserName: Joi.string().required(),
//         Age: Joi.string().required(),
//         Gender: Joi.string().required(),
//         Weight: Joi.string().required(),
//         Height: Joi.string().required(),
//         ActorEmail: Joi.string().required(),
//         ActorPassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      
//     }),
//     params: Joi.object().required().keys({
//         id: Joi.string().required().min(24).max(24)
//     })
// }

// module.exports = {
//     ActorRegisterValidators,
//     ActorLoginValidators,
//     ActorUpdateValidators
// }


const { body } = require('express-validator')

const ActorRegisterValidators = [
    body("UserName").isString().withMessage('in-valid UserName validation'),
    body("ActorEmail").isEmail().withMessage('in-valid ActorEmail Syntax'),
    body("Gender").isString().withMessage('in-valid Gender'),
    body("Age").isString().withMessage('in-valid Age'),
    body("Height").isString().withMessage('in-valid Height'),
    body("Weight").isString().withMessage('in-valid Weight'),
    body("ActorPassword").isString().withMessage('in-valid ActorPassword '),
    body('ConfirmationPassword').custom((value, { req }) => {
        if (value !== req.body.ActorPassword) {
          throw new Error('Confirmation Password does not match ActorPassword');
        }
        return true;
      }),
    
    
]


module.exports = {
    ActorRegisterValidators
}