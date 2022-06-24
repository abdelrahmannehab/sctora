const Joi = require('joi')

const CompanyRegisterValidators = {
    body: Joi.object().required().keys({
        CompanyName: Joi.string().required().messages({
            'string.empty':'Sorry empty Company Name is not accepted',
            'string.base':'Sorry Only String value are accepted',
    }),
        CompanyManagerName: Joi.string().required(),
        CompanyAddress: Joi.string().required(),
        CompanyEmail: Joi.string().required(),
        CompanyPassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        CompanyConfirmPassword: Joi.ref('CompanyPassword'),
    })
}

const CompanyLoginValidators={
    body: Joi.object().keys({
        CompanyEmail: Joi.string().email(),
        CompanyPassword:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
}
const CompanyUpdateValidators = {
    body: Joi.object().required().keys({
        CompanyName: Joi.string().required(),
        CompanyManagerName: Joi.string().required(),
        CompanyAddress: Joi.string().required(),
        CompanyEmail: Joi.string().required(),
        CompanyPassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      
    }),
    params: Joi.object().required().keys({
        id: Joi.string().required().min(24).max(24)
    })
}

module.exports = {
    CompanyRegisterValidators,
    CompanyLoginValidators,
    CompanyUpdateValidators
}