const auth = ()=>{

    return(req,res,next) =>{
        const headerToken = req.headerToken['authorization']
        console.log(headerToken)
    }
}

module.exports = {
    auth
}