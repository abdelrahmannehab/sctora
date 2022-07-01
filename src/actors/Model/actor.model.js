const mongoose = require('mongoose');
const actorSchema = require('../Schema/actor.schema')

const actor = mongoose.model("actor",actorSchema)



module.exports = actor;