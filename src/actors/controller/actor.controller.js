const Actor = require('../Model/actor.model');


const getAllActorsHandlr = async (req,res)=>{

    const {searchKey} = req.query ;
    try {
             if (searchKey){
                const data = await Actor.find({userName:{$regex : searchKey}})
                res.json({message: "Success" , data})
            } else {
                const data = await Actor.find({})
                res.json({message: "success" , data})
            }
    } catch (error) {
        res.json( error.message)
    }
}

const getActorByIdHandlr = async (req,res)=>{
    const {id} = req.params;
        try {
        const data = await Actor.findOne({_id : id})
        if(data)
        {
            res.json({message : "success" , data});
        }else{
            res.json({message : "invalid id" });
        }
        
    
    } catch (error) {
        res.json({message : "Error" , error});
    }

}

const updateActorHandlr = async (req,res)=>{
    const {UserName,ActorEmail,Gender,Age,Height,Weight,ActorPassword} = req.body;
    try {
        await Actor.findByIdAndUpdate({_id : req.params.id}, {UserName,ActorEmail,Gender,Age,Height,Weight,ActorPassword},{new:true});
        const updateActorHandlr = await Actor.findOne({ _id : req.params.id });
        res.json({message:"Updated Success" , data: updateActorHandlr.UserName});

    } catch (error) {
        res.json({message:"Error" , error});
    }
}


const addActorHandlr = async (req,res) =>{
    const {UserName,ActorEmail,Gender,Age,Height,Weight,ActorPassword} = req.body;
    try {
        const newActor= new Actor({UserName,ActorEmail,Gender,Age,Height,Weight,ActorPassword});
        const data = await newActor.save();
        res.json({message:"Created Success", data})
    } catch (error) {
        res.json({message:"Error!", error});
    }
}

const ActorRegistration = async (req,res)=>{
    const { UserName,ActorEmail,Gender,Age,Height,Weight,ActorPassword,ActorConfirmPassword  } = req.body;
   
   try {
        if(ActorPassword == ActorConfirmPassword)
        {
            const ActorExist = await Actor.findOne({ActorEmail})
            //console.log(ActorExist);
            if (ActorExist) {
               res.json({message:"in-valied Actor already exist"})
            } else {
                const newActor = new Actor({UserName,ActorEmail,Gender,Age,Height,Weight,ActorPassword });
                //const savedActor = await newActor.save();
                res.json({message:"Done" , newActor});
            }
        } else {
            res.json({message:"Password doesn't match"});
        }
        
   } catch (error) {
    res.json(error.message);
   }
}

const ActorLogin = async (req,res)=>{
    const {ActorEmail,ActorPassword} = req.body;
    const ActorExist = await Actor.findOne({ActorEmail})
    try {
        if (ActorExist) {
            if (ActorExist.ActorPassword == ActorPassword) {
                res.status(StatusCodes.OK).res.json({message:"Done"})
            }else{
                res.status(StatusCodes.FORBIDDEN).res.json({message:"in-valid password", statusmessage:getReasonPhrase(StatusCodes.FORBIDDEN)})
            }
        } else {
            res.json({message:"Actor doesn't exist"})
        }
    } catch (error) {
        res.json( error.message);
    }
}




module.exports = {
    getAllActorsHandlr,
    updateActorHandlr,
    addActorHandlr,
    ActorRegistration,
    ActorLogin,
}