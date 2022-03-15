const Company = require("../Model/company.model")

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
   


// const getCompanyByIdHandlr = async (req,res)=>{
//     const {id} = req.params;
//         try {
//         const data = await Company.findOne({_id : id})
//         if(data)
//         {
//             res.json({message : "success" , data});
//         }else{
//             res.json({message : "invalid id" });
//         }
        
    
//     } catch (error) {
//         res.json({message : "Error" , error});
//     }

// }


const updateCompanyHandlr = async (req,res) => {
   
    const { companyName,email,password } = req.body;
    try {
        await Company.findByIdAndUpdate({_id : req.params.id},{ companyName,email,password  });
        const updateCompanyHandlr = await Company.findOne({ _id : req.params.id });
        res.json({ message: "updated success",data: updateCompanyHandlr.companyName });

    } catch (error) {
        res.json({message : "Error" , error});
    }
}



const addCompanyHandlr = async (req,res) => {
    const { companyName, email} =  req.body;
    try{
        
        const newComapny = new Company({companyName,email});
        const data = await newComapny.save();
        
        //const data = await Company.insertMany({companyName,email});
        res.json({message : "Created success" , data});

    } catch (error) {
        res.json({message : "Error" , error});
    }
}




module.exports = {
    getAllCompaniesHandlr,
    addCompanyHandlr,
    updateCompanyHandlr,

}