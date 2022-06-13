const  mongoose = require('mongoose');

const { Schema } = mongoose
const actorSchema = new Schema({
    UserName: {type:String , required : true},
    ActorEmail : {type:String , required: true},
    Gender : {type:String , required: true},
    Height : {type: String, required: true},
    Weight : {type: String, required: true},
    Age : {type: Number, required: true},
    ActorPassword : {type: String, required: true},

},{
    timestamps: true
});




module.exports = actorSchema;