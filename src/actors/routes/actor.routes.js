const { getAllActorsHandlr,
    addActorHandlr,
    updateActorHandlr
} = require('../controller/actor.controller');

const ActorRouter = require('express').Router()


router.get("/actors", getAllActorsHandlr);
router.get("/actors/:id",getAllActorsHandlr);
router.post("/actors",addActorHandlr);
router.put("/actors/:id",updateActorHandlr);

module.exports = ActorRouter