


const { auth} = require("../../middlewear/auth");
const handelValidation = require("../../middlewear/handelValidation");
const {ActorRegister,ActorLogin,ActorProfile,updateActorHandlr,getAllActorsHandlr, ActorEditProfilePic, editProfilePic, getAllActors} = require("./Controller/actor")
const { ActorRegisterValidator, ActorupdateValidator } = require("./Controller/actor.validation");
const endPoint = require("./endPoint");

const router = require("express").Router();





//Register
router.post('/actors/register', ActorRegisterValidator, handelValidation(), ActorRegister)
//Login
router.post('/actors/login', ActorRegisterValidator[1,2], handelValidation(), ActorLogin)
//profile
router.get('/actors/profile', auth(),ActorProfile)
router.patch('/actors/profile/picture', auth(),ActorEditProfilePic)

//getAllActorsHandlr
router.get('/admin/getAllActor', getAllActors)

//update
router.patch("/actors/update/:id", ActorupdateValidator,handelValidation(),updateActorHandlr);






module.exports = router;