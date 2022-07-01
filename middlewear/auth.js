// const jwt = require("jsonwebtoken");
// const Actor = require("../src/actors/Model/actor.model");



// const auth = ()=>{

//     return async (req,res,next) =>{
//         const headerToken = req.headers['authorization']; 
//         console.log(headerToken);

//         if (!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith('Bearer')) {
//             res.json({message: "in-valied headerToken"})
//         } else {
//             const token = headerToken.split(" ")[1]
//             const decoded = jwt.verify(token, process.env.secretKey)
//             const actor = await Actor.findOne({_id: decoded.id}).select('-ActorPassword')
//             if (!actor) {
//                 res.json({message:"in-valid token data"})
//             }else{
//                 req.actor = actor;
//                 next()
//             }
//         }
//     }
// }

// module.exports = {
//     auth
// }

const jwt = require('jsonwebtoken');
const Actor = require("../src/actors/Model/actor.model");

const roles = {
    Actor:"Actor",
    Company:"Company",
    Admin:"Admin"
}

const auth = (data) => {

    return async(req, res, next) => {
        try {
            const headerToken = req.headers['authorization']
            console.log(headerToken);

            if (!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith('Bearer')) {
                res.json({ message: "in-valid headerToken" })
            } else {
                const token = headerToken.split(" ")[1];
                const decoded = jwt.verify(token, process.env.secretKey)
                const actor = await Actor.findOne({ _id: decoded.id }).select("-ActorPassword")
                if (!actor) {
                    res.json({ message: "in-valid token data" })
                } else {

                    if(data.includes(actor.role))  {
                        req.actor = actor;
                        next()
                    } else{
                        res.json({message:"Sorry you're not authorized"});
                    }             
                    
                }

            }
        } catch (error) {
            res.json({ message: "catch err", error })
        }

    }
}


module.exports = {
    auth,
    roles
}