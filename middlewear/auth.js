const auth = ()=>{

    return(req,res,next) =>{
        const headerToken = req.headerToken['authorization']
    }
}

module.exports = {
    auth
}