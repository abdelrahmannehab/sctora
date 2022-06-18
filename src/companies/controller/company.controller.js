const Actor = require("../../actors/Model/actor.model");
const Company = require("../Model/company.model");
const companySchema = require("../Schema/company.schema");

const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes') ;

const getAllCompaniesHandlr = async (req,res)=>{
    const {id} = req.params;
    const {searchKey} = req.query;

    try {
        if(id) {
            const data = await Company.findOne({_id : id});
            if(data) {
                res.json({message : "success" , data});
            }else{
                res.json({message : "invalid id" });
            }
        } else if (searchKey){
           const data = await Company.find({companyName:{$regex : searchKey}})
           res.json({message : "success" , data}); 
        } else {     
        const data = await Company.find({})
        res.json({message : "success" , data});
        }
     } catch (error) {
        res.json({message : "Error" , error});
    }
}
   


const getCompanyByIdHandlr = async (req,res)=>{
    const {id} = req.params;
        try {
        const data = await Company.findOne({_id : id})
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


const updateCompanyHandlr = async (req,res) => {
   
    const { CompanyName,CompanyManagerName,CompanyAddress,CompanyEmail,CompanyPassword } = req.body;
    try {
        await Company.findByIdAndUpdate({_id : req.params.id},{ CompanyName,CompanyManagerName,CompanyAddress,CompanyEmail,CompanyPassword  },{new:true});
        const updateCompanyHandlr = await Company.findOne({ _id : req.params.id });
        res.json({ message: "updated success",data: updateCompanyHandlr.CompanyName });

    } catch (error) {
        res.json({message : "Error" , error});
    }
}



const addCompanyHandlr = async (req,res) => {
    const { CompanyName,CompanyManagerName,CompanyAddress,CompanyEmail,CompanyPassword} =  req.body;
    try{
        
        const newComapny = new Company({CompanyName,CompanyManagerName,CompanyAddress,CompanyEmail,CompanyPassword});
        const data = await newComapny.save();
        
        //const data = await Company.insertMany({companyName,email});
        res.json({message : "Created success" , data});

    } catch (error) {
        res.json({message : "Error" , error});
    }
}

const CompanyRegistration = async (req,res)=>{
    const { CompanyName,CompanyManagerName,CompanyAddress,CompanyEmail,CompanyPassword,CompanyConfirmPassword  } = req.body;
   
   try {
        if(CompanyPassword == CompanyConfirmPassword)
        {
            const CompanyExist = await Company.findOne({CompanyEmail})
            console.log(CompanyExist);
            if (CompanyExist) {
                res.json({message:"in-valied Company already exist"}) 
            } else {
                const newComapny = new Company({CompanyName,CompanyManagerName,CompanyAddress,CompanyEmail,CompanyPassword});
                //const savedCompany = await newComapny.save();
               res.json({message:"Done" , newComapny});
            }
        } else {
            res.json({message:"Password doesn't match"});
        }

   } catch (error) {
    res.json({message : "Error" , error});
   }
   
}

const CompanyLogin = async (req,res)=>{
    const {CompanyEmail,CompanyPassword} = req.body;
    const CompanyExist = await Company.findOne({CompanyEmail})

    try {
        if (CompanyExist) {
            if (CompanyExist.CompanyPassword == CompanyPassword) {
                res.status(StatusCodes.OK).res.json({message:"Done"})
            }else{
                res.status(StatusCodes.FORBIDDEN).res.json({message:"in-valid password", statusmessage:getReasonPhrase(StatusCodes.FORBIDDEN)}) 
            }
        } else {
            res.json({message:"Company doesn't exist"})
        }
    } catch (error) {
        res.json({message : "Error" , error});
    }
}




module.exports = {
    getAllCompaniesHandlr,
    addCompanyHandlr,
    updateCompanyHandlr,
    CompanyRegistration,
    CompanyLogin,
}