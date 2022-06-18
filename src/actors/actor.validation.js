const Joi = require('joi')

const ActorRegisterValidators = {
    body: Joi.object().required().keys({
        UserName: Joi.string().required().messages({
            'string.empty':'Sorry empty  Username is not accepted',
            'string.base':'Sorry Only String value are accepted',
    }),
        Age: Joi.string().required(),
        Gender: Joi.string().required(),
        ActorEmail: Joi.string().required(),
        Weight: Joi.string().required(),
        Height: Joi.string().required(),
        ActorPassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        ActorConfirmPassword: Joi.ref('ActorPassword'),
    })
}

const ActorLoginValidators={
    body: Joi.object().required().keys({
        ActorEmail: Joi.string().required().email(),
        ActorPassword:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
}
const ActorUpdateValidators = {
    body: Joi.object().required().keys({
        UserName: Joi.string().required(),
        Age: Joi.string().required(),
        Gender: Joi.string().required(),
        Weight: Joi.string().required(),
        Height: Joi.string().required(),
        ActorEmail: Joi.string().required(),
        ActorPassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      
    }),
    params: Joi.object().required().keys({
        id: Joi.string().required().min(24).max(24)
    })
}

module.exports = {
    ActorRegisterValidators,
    ActorLoginValidators,
    ActorUpdateValidators
}