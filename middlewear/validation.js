
const headerMethods = ['body','params','query']

const handlerValidation = (schema)=>{
   return (req,res,next)=>{
    

    let validation = []



    headerMethods.forEach((key)=>{
        if (schema[key]) {

            const validationResult = schema[key].validate(req[key])

            if (validationResult.error) {
            validation.push(validationResult.error.details[0])
        }
    }
        
    })



    if (validation.length) {
        res.status(400).json({meesage:"Please enter valid data" , err: validation})
    } else{
        next()
    }


   }
    
}

module.exports = handlerValidation