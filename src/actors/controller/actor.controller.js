const Actor = require('../Model/actor.model')

const getAllActorsHandlr = async (req,res)=>{
    const {id} = req.params;
    const {searchKey} = req.query;

    try {
        if(id) {
            const data = await Actor.findOne({_id : id});
            if(data) {
                res.json({message : "success" , data});
            }else{
                res.json({message : "invalid id" });
            }
        } else if (searchKey){
           const data = await Actor.find({UserName:{$regex : searchKey}})
           res.json({message : "success" , data}); 
        } else {     
        const data = await Actor.find({})
        res.json({message : "success" , data});
        }
     } catch (error) {
        res.json({message : "Error" , error});
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


const updateActorHandlr = async (req,res) => {
   
    const { UserName,ActorEmail,Gender,Height,Weight,Age,ActorPassword } = req.body;
    try {
        await Actor.findByIdAndUpdate({_id : req.params.id},{ UserName,ActorEmail,Gender,Height,Weight,Age,ActorPassword  });
        const updateActorHandlr = await Actor.findOne({ _id : req.params.id });
        res.json({ message: "updated success",data: updateActorHandlr.UserName });

    } catch (error) {
        res.json({message : "Error" , error});
    }
}



const addActorHandlr = async (req,res) => {
    const { UserName,ActorEmail,Gender,Height,Weight,Age,ActorPassword} =  req.body;
    try{
        
        const newComapny = new Actor({UserName,ActorEmail,Gender,Height,Weight,Age,ActorPassword});
        const data = await newComapny.save();
        
        //const data = await Actor.insertMany({UserName,email});
        res.json({message : "Created success" , data});

    } catch (error) {
        res.json({message : "Error" , error});
    }
}


module.exports = {
    getAllActorsHandlr,
    addActorHandlr,
    updateActorHandlr
}