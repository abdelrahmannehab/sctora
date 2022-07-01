const handlerValidation = require('../../../middlewear/validation');
const { ActorRegisterValidators, ActorLoginValidators, ActorUpdateValidators } = require('../actor.validation');
const { getAllActorsHandlr,
        updateActorHandlr,
        //addActorHandlr,
        ActorRegistration,
        ActorLogin
    } = require('../controller/actor.controller')

const router = require('express').Router()

router.get("/actors",getAllActorsHandlr);
router.get("/actor/:id",getAllActorsHandlr);
//router.post("/actors",addActorHandlr);
router.post("/actors/register",ActorRegisterValidators,handlerValidation(),ActorRegistration);
router.post("/actorsLogin",ActorLogin);
router.patch("/actors/:id",updateActorHandlr);


module.exports = router