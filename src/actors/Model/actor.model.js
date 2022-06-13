const mongoose = require('mongoose');
const actorSchema= require('../Schema/actor.schema')

const Actor = mongoose.model("company", actorSchema)


module.exports = Actor;