const Actor = require('../Model/actor.model');


const getAllActorsHandlr = async (req,res)=>{
    const id = req.params;
    const {searchKey} = req.quary ;
    try {
        if (id) {
            const data = await Actor.findone({_id: id});
            if(data) {
                res.json({message : "success" , data});
            }else{
                res.json({message : "invalid id" });
            }
        } else if (searchKey){
                const data = await Actor.find({userName:{$regex : searchKey}})
                res.json({message: "Success" , data})
            } else {
                const data = await Actor.find({})
                res.json({message: "success" , data})
            }
    } catch (error) {
        res.json({message: "Error!" , error})
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
        await Actor.findByIdAndUpdate({_id : req.params.id}, {UserName,ActorEmail,Gender,Age,Height,Weight,ActorPassword});
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

module.exports = {
    getAllActorsHandlr,
    updateActorHandlr,
    addActorHandlr
}