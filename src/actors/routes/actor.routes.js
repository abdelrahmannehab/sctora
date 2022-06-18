const { getAllActorsHandlr,
        updateActorHandlr,
        addActorHandlr
    } = require('../controller/actor.controller')

const ActorRouter = require('express').Router()

ActorRouter.get("/Actors",getAllActorsHandlr);
ActorRouter.get("/Actor/:id",getAllActorsHandlr);
ActorRouter.post("Actors",addActorHandlr);
ActorRouter.put("/Actors/:id", updateActorHandlr);


module.exports = ActorRouter