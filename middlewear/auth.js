const jwt = require("jsonwebtoken");
const Actor = require("../src/actors/Model/actor.model");



const auth = ()=>{

    return async (req,res,next) =>{
        const headerToken = req.headers['authorization']; 
        console.log(headerToken);

        if (!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith('Bearer')) {
            res.json({message: "in-valied headerToken"})
        } else {
            const token = headerToken.split(" ")[1]
            const decoded = jwt.verify(token, process.env.secretKey)
            const actor = await Actor.findOne({_id:decoded.id}).select("-ActorPassword")
            if (!Actor) {
      
                res.json({message:"in-valid token data"})
            }else{
                req.actor = actor;
                next()
            }
        }
    }
}

module.exports = {
    auth
}