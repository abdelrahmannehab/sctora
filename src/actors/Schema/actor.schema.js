const { string } = require('joi');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const{Schema} = mongoose

const actorSchema = new Schema ({
    UserName: {type: String , required: true},
    ActorEmail: {type: String , required: true, unique: true},
    Gender: {type: String , required: true},
    Age: {type: String , required: true},
    Weight: {type: String , required: true},
    Height: {type: String , required: true},
    ActorPassword: {type: String , required: true},
    ActorPhoneNumber: {type: String},
    ActorProfilePic:{type:String}
},{
    timestamps: true
});

actorSchema.pre("save" , async function(next){
    this.ActorPassword = await bcrypt.hash(this.ActorPassword, parseInt( process.env.SALT))
    next();
})

module.exports = actorSchema;