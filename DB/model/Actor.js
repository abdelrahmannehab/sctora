
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const actorSchema = new mongoose.Schema({

    UserName: {type: String , required: true},
    ActorEmail: {type: String , required: true, unique: true},
    Gender: {type: String , required: true},
    Age: {type: String , required: true},
    Weight: {type: String , required: true},
    Height: {type: String , required: true},
    ActorPassword: {type: String , required: true},
   // role: {type: Boolean, default: 'Actor'},
    ActorProfilePic: String,
    PhoneNumber: String,
    ShareActorProfile: String,
    

},{
    timestamps: true
});


actorSchema.pre("save", async function(next){
     
 this.ActorPassword = await bcrypt.hash(this.ActorPassword, parseInt( process.env.SALT))
 next();

})
const actorModel = mongoose.model('Actor', actorSchema)


module.exports = actorModel;