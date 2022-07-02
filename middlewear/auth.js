
const jwt = require("jsonwebtoken");
const actorModel = require("../DB/model/Actor");





const auth = () => {

    return async(req, res, next) => {
        try {
            const headerToken = req.headers['authorization']
            //console.log(headerToken);

            if (!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith('Bearer')) {
                res.json({ message: "in-valid headerToken" })
            } else {
                const token = headerToken.split(" ")[1];
                const decoded = jwt.verify(token, process.env.SECRETKEY)
                const actor = await actorModel.findOne({ _id: decoded.id }).select("-ActorPassword")
                if (!actor) {
                    res.json({ message: "in-valid token data" })
                } else {
                        req.actor = actor;
                        next();
                    }
                    

            }
        } catch (error) {
            res.json({ message: "catch err", error })
        }

    }
}


module.exports = {
    auth
}