
const jwt = require('jsonwebtoken');
const actorModel = require("../../../DB/model/Actor");
const bcrypt = require('bcrypt')


const ActorRegister = async(req,res)=>{

    try {
        const { UserName,ActorEmail,Gender,Age,Height,Weight,ActorPassword  } = req.body;
        const actor = await actorModel.findOne({ActorEmail});

        if(actor)
        {
            res.json({message:"Email already exist"})
        } else{
            const newActor = new actorModel({UserName,ActorEmail,Gender,Age,Height,Weight,ActorPassword});
            const savedActor = await newActor.save(); 
            // const token = jwt.sign({id:savedActor._id}, process.env.SECRETKEY)
            res.json({message:"Done"})
        }
          
    } catch (error) {
       res.json(console.log(error))
    }

}

const ActorLogin = async (req,res)=>{
    const {ActorEmail,ActorPassword} = req.body;
    const actor = await actorModel.findOne({ActorEmail});
    try {
        if (!actor) {
            res.json({message:"in-valid Actor"})
    
        } else {
            const match = await bcrypt.compare(ActorPassword , actor.ActorPassword)
            if (match) {
                const token = jwt.sign({ id:actor.id,isLoggedIn:true }, process.env.SECRETKEY, {expiresIn:3600})
                res.json({message:"Done" , token})
            } else {
                res.json({message:"Passwrod mismacth"})
            }
        }
    } catch (error) {
        res.json({message:"catch err" , error});
    }
}

const ActorProfile = async (req,res)=>{
   
   try {
            const actor = await actorModel.findOne({_id: req.actor._id}).select('-ActorPassword')
            if (!actor) {
               res.json({message:"in-valied Actor "})
            } else {
                res.json({message:"Done", actor})
            }
       
   } catch (error) {
    res.json({message:"catch err" , error});
   }
}

const ActorEditProfilePic = async(req, res) => {
    try {
        if (!req.files) {
            console.log("not found");
        } else {
            console.log(req.files[0]);

            const imageURl = `${req.protocol}://${req.headers.host}/${req.files[0].destination}/${req.files[0].filename}`;
            const actor = await actorModel.findOneAndUpdate({ _id: req.actor.id }, { ActorProfilePic: imageURl })
            if (actor) {
                res.json({ message: "Done", imageURl })
            } else {
                res.json({ message: "in-valid user" })
            }
        }
    } catch (error) {
        res.json({ message: "catch err ", error })
    }
}


const updateActorHandlr = async (req,res)=>{
    const {id} = req.params;
    const {UserName,ActorEmail,Gender,Age,Height,Weight,ActorPassword,PhoneNumber} = req.body;
    
    try {
        
        const actorUpdated = await actorModel.findByIdAndUpdate({_id:id} , {UserName,ActorEmail,Gender,Age,Height,Weight,ActorPassword,PhoneNumber}, {new: true})
        req.json({message:"Done" , actorUpdated})
    } catch (error) {
        res.json({ message: "catch err ", error })
    }
}

const getAllActors = async (req,res)=>{

    const {searchKey} = req.query ;

        let {page, size}  = req.query;

        if (!page || page <= 0 ) {
            page = 1;
        }

        if (!size) {
            size = 3
        }

        const skip = (page - 1 ) * size

        const actor = await actorModel.find({}).select('-ActorPassword').limit(size).skip(skip);

        res.json({actor})

    } 


module.exports = {
    ActorRegister,
    ActorLogin,
    ActorProfile,
    updateActorHandlr,
    getAllActors,
    ActorEditProfilePic
}