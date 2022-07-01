const mongoose = require('mongoose');
const actorSchema = require('../Schema/actor.schema')

const Actor = mongoose.model("actor",actorSchema)



module.exports = Actor;