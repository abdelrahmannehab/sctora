
const jwt = require('jsonwebtoken');
const actorModel = require("../../../DB/model/Actor");
const bcrypt = require('bcrypt');
const companyModel = require('../../../DB/model/Company');


const CompanyRegister = async(req,res)=>{

    try {
        const { CompanyName,CompanyManagerName,CompanyAddress,CompanyEmail,CompanyPassword  } = req.body;
        const company = await companyModel.findOne({CompanyEmail});
        if(company)
        {
            res.json({message:"Email already exist"})
        } else{
            const newCompany = new companyModel({CompanyName,CompanyManagerName,CompanyAddress,CompanyEmail,CompanyPassword});
            const savedCompany = await newCompany.save(); 
            res.json({message:"Done"})
        }
          
    } catch (error) {
       res.json(console.log(error))
    }

}

const CompanyLogin = async (req,res)=>{
    const {CompanyEmail,CompanyPassword} = req.body;
    const company = await companyModel.findOne({CompanyEmail});
    try {
        if (!company) {
            res.json({message:"in-valid Company"})
    
        } else {
            const match = await bcrypt.compare(CompanyPassword , company.CompanyPassword)
            if (match) {
                const token = jwt.sign({ id:company.id,isLoggedIn:true }, process.env.SECRETKEY, {expiresIn:3600})
                res.json({message:"Done" , token})
            } else {
                res.json({message:"Passwrod mismacth"})
            }
        }
    } catch (error) {
        res.json({message:"catch err" , error});
    }
}

const CompanyProfile = async (req,res)=>{
   
   try {
            const company = await companyModel.findOne({_id: req.company._id}).select('-CompanyPassword')
            if (!company) {
               res.json({message:"in-valied Company "})
            } else {
                res.json({message:"Done", company})
            }
       
   } catch (error) {
    res.json({message:"catch err" , error});
   }
}

const CompanyEditProfilePic = async(req, res) => {
    try {
        if (!req.files) {
            console.log("not found");
        } else {
            console.log(req.files[0]);

            const imageURl = `${req.protocol}://${req.headers.host}/${req.files[0].destination}/${req.files[0].filename}`;
            const company = await companyModel.findOneAndUpdate({ _id: req.company.id }, { CompanyProfilePic: imageURl })
            if (company) {
                res.json({ message: "Done", imageURl })
            } else {
                res.json({ message: "in-valid user" })
            }
        }
    } catch (error) {
        res.json({ message: "catch err ", error })
    }
}


const updateCompanyHandlr = async (req,res)=>{
    const {id} = req.params;
    const {CompanyName,CompanyManagerName,CompanyAddress,CompanyEmail,CompanyPassword } = req.body;
    
    try {
        
        const companyUpdated = await companyModel.findByIdAndUpdate({_id:id} , {CompanyName,CompanyManagerName,CompanyAddress,CompanyEmail,CompanyPassword }, {new: true})
        req.json({message:"Done" , companyUpdated})
    } catch (error) {
        res.json({ message: "catch err ", error })
    }
}

const getAllCompanies = async (req,res)=>{

    const {searchKey} = req.query ;

        let {page, size}  = req.query;

        if (!page || page <= 0 ) {
            page = 1;
        }

        if (!size) {
            size = 3
        }

        const skip = (page - 1 ) * size

        const company = await companyModel.find({}).select('-CompanyPassword').limit(size).skip(skip);

        res.json({company})

    } 


module.exports = {
    CompanyRegister,
    CompanyLogin,
    CompanyProfile,
    CompanyEditProfilePic,
    updateCompanyHandlr,
    getAllCompanies
}