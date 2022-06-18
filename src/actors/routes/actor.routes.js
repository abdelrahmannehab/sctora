const { getAllActorsHandlr,
        updateActorHandlr,
        addActorHandlr
    } = require('../controller/actor.controller')

const ActorRouter = require('express').Router()

ActorRouter.get("/actors",getAllActorsHandlr);
ActorRouter.get("/actor/:id",getAllActorsHandlr);
ActorRouter.post("actors",addActorHandlr);
ActorRouter.put("/actors/:id", updateActorHandlr);


module.exports = ActorRouter