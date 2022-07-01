const handelValidation = ()=>{


    return(req,res,next) =>{
       try {
        const validationError = validationResult(req )

        if (validationError.isEmpty()) {
            next()

        } else{
           res.json({message: "Validation error" , error: validationResult.errors})
        }

       } catch (error) {
       res.json({message: "Server error" , error})
       }
 
    }
}

module.exports = {handelValidation}